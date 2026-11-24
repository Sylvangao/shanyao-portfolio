import assert from 'node:assert/strict';
import { test } from 'node:test';
import { tiltAmplitude, CARD_TILT_AMPLITUDE } from '../app/motion/project-tilt.ts';

test('Projects baseline uses two thirds of the previous tilt', () => {
  assert.equal(CARD_TILT_AMPLITUDE, 7);
  assert.ok(Math.abs(tiltAmplitude(582, 582) - CARD_TILT_AMPLITUDE) < 0.0001);
});
test('smaller surfaces also reduce their previous angle by two thirds', () => {
  const angle = tiltAmplitude(330, 582);
  assert.ok(angle > CARD_TILT_AMPLITUDE);
  assert.ok(
    Math.abs(
      angle -
        ((Math.atan((Math.tan((10.5 * Math.PI) / 180) * 582) / 330) * 180) / Math.PI) * (2 / 3),
    ) < 0.0001,
  );
});
test('short surfaces stay within a safe angle', () => {
  assert.equal(tiltAmplitude(80, 436), 16);
  assert.ok(Number.isFinite(tiltAmplitude(0, 436)));
});

test('foreground depth follows the spring, reverses direction, and resets on cleanup', async () => {
  const { attachProjectTilt } = await import('../app/motion/project-tilt.ts');
  const saved = new Map(
    ['window', 'document', 'requestAnimationFrame', 'cancelAnimationFrame'].map((key) => [
      key,
      globalThis[key],
    ]),
  );
  let nextId = 0;
  const frames = new Map();
  const handlers = new Map();
  const styles = new Map();
  const noOp = () => {};
  const media = { matches: true, addEventListener: noOp, removeEventListener: noOp };
  globalThis.window = {
    matchMedia: () => media,
    addEventListener: noOp,
    removeEventListener: noOp,
  };
  globalThis.document = {
    hidden: false,
    querySelector: () => null,
    addEventListener: noOp,
    removeEventListener: noOp,
  };
  globalThis.requestAnimationFrame = (callback) => {
    frames.set(++nextId, callback);
    return nextId;
  };
  globalThis.cancelAnimationFrame = (id) => frames.delete(id);
  const card = {
    offsetWidth: 582,
    offsetHeight: 436.5,
    dataset: {},
    style: { setProperty: (key, value) => styles.set(key, value) },
    getBoundingClientRect: () => ({ left: 0, top: 0, width: 582, height: 436.5 }),
    addEventListener: (type, handler) => handlers.set(type, handler),
    removeEventListener: (type) => handlers.delete(type),
  };
  let cleanup;
  try {
    cleanup = attachProjectTilt(card);
    let time = 0;
    const advance = () => {
      for (let i = 0; i < 240 && frames.size; i++) {
        const pending = [...frames.values()];
        frames.clear();
        time += 16;
        pending.forEach((callback) => callback(time));
      }
    };
    handlers.get('pointermove')({ pointerType: 'mouse', clientX: 582, clientY: 436.5 });
    advance();
    assert.ok(Number(styles.get('--project-depth-x')) > 0);
    assert.ok(Number(styles.get('--project-depth-y')) > 0);
    const angle = Number.parseFloat(styles.get('--project-rotate-y'));
    assert.ok(
      Math.abs(Number(styles.get('--project-depth-x')) - Math.sin((angle * Math.PI) / 180)) <
        0.00001,
    );
    handlers.get('pointermove')({ pointerType: 'mouse', clientX: 0, clientY: 0 });
    advance();
    assert.ok(Number(styles.get('--project-depth-x')) < 0);
    assert.ok(Number(styles.get('--project-depth-y')) < 0);
    handlers.get('pointerleave')();
    advance();
    assert.equal(Number(styles.get('--project-depth-x')), 0);
    assert.equal(Number(styles.get('--project-depth-y')), 0);
    cleanup();
    cleanup = undefined;
    assert.equal(frames.size, 0);
    assert.equal(handlers.size, 0);
  } finally {
    cleanup?.();
    for (const [key, value] of saved) {
      if (value === undefined) delete globalThis[key];
      else globalThis[key] = value;
    }
  }
});
