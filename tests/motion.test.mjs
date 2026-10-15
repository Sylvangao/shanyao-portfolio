import assert from 'node:assert/strict';
import { test } from 'node:test';

let sequence = 0;
async function fixture() {
  const observers = [];
  const frames = new Map();
  const timers = new Map();
  const windowEvents = new Map();
  const preferenceEvents = new Set();
  const preference = {
    matches: false,
    addEventListener: (_name, fn) => preferenceEvents.add(fn),
    removeEventListener: (_name, fn) => preferenceEvents.delete(fn),
  };
  let frameId = 0;
  let fontsReady;
  const fonts = new Promise((resolve) => {
    fontsReady = resolve;
  });
  const previous = Object.fromEntries(
    [
      'window',
      'document',
      'IntersectionObserver',
      'requestAnimationFrame',
      'cancelAnimationFrame',
    ].map((key) => [key, globalThis[key]]),
  );
  globalThis.window = {
    setTimeout: (fn) => {
      const id = ++frameId;
      timers.set(id, fn);
      return id;
    },
    matchMedia: () => preference,
    addEventListener: (name, fn) => {
      if (!windowEvents.has(name)) windowEvents.set(name, new Set());
      windowEvents.get(name).add(fn);
    },
    removeEventListener: (name, fn) => windowEvents.get(name)?.delete(fn),
  };
  globalThis.document = { fonts: { ready: fonts } };
  globalThis.IntersectionObserver = class {
    targets = new Set();
    constructor(callback) {
      this.callback = callback;
      observers.push(this);
    }
    observe(element) {
      this.targets.add(element);
    }
    unobserve(element) {
      this.targets.delete(element);
    }
  };
  globalThis.requestAnimationFrame = (callback) => {
    const id = ++frameId;
    frames.set(id, callback);
    return id;
  };
  globalThis.cancelAnimationFrame = (id) => frames.delete(id);
  const runtime = await import(`../app/motion/runtime.ts?fixture=${sequence++}`);
  return {
    runtime,
    observers,
    frames,
    timers,
    windowEvents,
    preference,
    preferenceEvents,
    fontsReady,
    restore() {
      for (const [key, value] of Object.entries(previous)) {
        if (value === undefined) delete globalThis[key];
        else globalThis[key] = value;
      }
    },
  };
}

test('entrances share one observer, fire once, and unsubscribe safely', async () => {
  const f = await fixture();
  try {
    const first = {},
      second = {};
    let calls = 0;
    f.runtime.observeEntrance(first, () => calls++);
    const stop = f.runtime.observeEntrance(second, () => calls++);
    assert.equal(f.observers.length, 1);
    stop();
    f.observers[0].callback([
      { target: first, isIntersecting: true },
      { target: second, isIntersecting: true },
    ]);
    f.observers[0].callback([{ target: first, isIntersecting: true }]);
    assert.equal(calls, 1);
    assert.equal(f.observers[0].targets.size, 0);
  } finally {
    f.restore();
  }
});

test('font readiness shares one promise and one fallback timer', async () => {
  const f = await fixture();
  try {
    const a = f.runtime.whenFontsReady(),
      b = f.runtime.whenFontsReady();
    assert.equal(a, b);
    assert.equal(f.timers.size, 1);
    f.fontsReady();
    await a;
  } finally {
    f.restore();
  }
});

test('reduced-motion subscribers share and clean up the media listener', async () => {
  const f = await fixture();
  try {
    let calls = 0;
    const stopA = f.runtime.observeMotionPreference((value) => {
      if (value) calls++;
    });
    const stopB = f.runtime.observeMotionPreference((value) => {
      if (value) calls++;
    });
    assert.equal(f.preferenceEvents.size, 1);
    f.preference.matches = true;
    f.preferenceEvents.forEach((callback) => callback({ matches: true }));
    assert.equal(calls, 2);
    stopA();
    stopB();
    assert.equal(f.preferenceEvents.size, 0);
  } finally {
    f.restore();
  }
});

test('scroll subscribers batch events into one frame and release listeners', async () => {
  const f = await fixture();
  try {
    let calls = 0;
    const stopA = f.runtime.observeScroll(() => calls++),
      stopB = f.runtime.observeScroll(() => calls++);
    assert.equal(calls, 2);
    assert.equal(f.windowEvents.get('scroll').size, 1);
    f.windowEvents.get('scroll').forEach((callback) => {
      callback();
      callback();
    });
    assert.equal(f.frames.size, 1);
    [...f.frames.values()][0]();
    assert.equal(calls, 4);
    stopA();
    stopB();
    assert.equal(f.windowEvents.get('scroll').size, 0);
    assert.equal(f.windowEvents.get('resize').size, 0);
  } finally {
    f.restore();
  }
});
