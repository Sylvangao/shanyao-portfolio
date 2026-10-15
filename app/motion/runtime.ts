// Shared browser-only animation services. No observers are created during SSR.
export const motion = {
  easing: 'cubic-bezier(.44,0,.56,1)',
  revealDuration: 400,
  resumeDuration: 500,
  wordInterval: 50,
  lineInterval: 100,
  resumeLineInterval: 300,
  fontTimeout: 2000,
  disclosureDuration: 400,
  disclosureContentLead: 260,
  disclosureCloseLead: 220,
} as const;

let fontsReady: Promise<void> | undefined;
export function whenFontsReady(): Promise<void> {
  if (!fontsReady) {
    fontsReady = new Promise((resolve) => {
      const timeout = window.setTimeout(resolve, motion.fontTimeout);
      document.fonts.ready.then(() => {
        clearTimeout(timeout);
        resolve();
      });
    });
  }
  return fontsReady;
}

let viewportObserver: IntersectionObserver | undefined;
const viewportCallbacks = new Map<Element, Set<() => void>>();
export function observeEntrance(element: Element, callback: () => void): () => void {
  viewportObserver ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const callbacks = viewportCallbacks.get(entry.target);
        viewportCallbacks.delete(entry.target);
        viewportObserver?.unobserve(entry.target);
        callbacks?.forEach((run) => run());
      }
    },
    { threshold: 0.1 },
  );
  let callbacks = viewportCallbacks.get(element);
  if (!callbacks) {
    callbacks = new Set();
    viewportCallbacks.set(element, callbacks);
    viewportObserver.observe(element);
  }
  callbacks.add(callback);
  return () => {
    callbacks.delete(callback);
    if (!callbacks.size) {
      viewportCallbacks.delete(element);
      viewportObserver?.unobserve(element);
    }
  };
}

let reducedMotion: MediaQueryList | undefined;
const motionCallbacks = new Set<(reduced: boolean) => void>();
export function prefersReducedMotion(): boolean {
  reducedMotion ??= window.matchMedia('(prefers-reduced-motion: reduce)');
  return reducedMotion.matches;
}
function notifyMotion(event: MediaQueryListEvent) {
  motionCallbacks.forEach((callback) => callback(event.matches));
}
export function observeMotionPreference(callback: (reduced: boolean) => void): () => void {
  prefersReducedMotion();
  if (!motionCallbacks.size) reducedMotion!.addEventListener('change', notifyMotion);
  motionCallbacks.add(callback);
  return () => {
    motionCallbacks.delete(callback);
    if (!motionCallbacks.size) reducedMotion!.removeEventListener('change', notifyMotion);
  };
}

export function revealElement(element: HTMLElement, duration: number, delay = 0): Animation {
  const animation = element.animate(
    [
      { opacity: 0.001, filter: 'blur(10px)', transform: 'translateY(10px)' },
      { opacity: 1, filter: 'blur(0px)', transform: 'translateY(0)' },
    ],
    { duration, delay, easing: motion.easing, fill: 'both' },
  );
  animation.finished.then(
    () => animation.cancel(),
    () => {},
  );
  return animation;
}

// Header and footer share one passive scroll listener and one frame callback.
const scrollCallbacks = new Set<() => void>();
let scrollFrame = 0;
function requestScrollUpdate() {
  if (scrollFrame) return;
  scrollFrame = requestAnimationFrame(() => {
    scrollFrame = 0;
    scrollCallbacks.forEach((callback) => callback());
  });
}
export function observeScroll(callback: () => void): () => void {
  if (!scrollCallbacks.size) {
    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    window.addEventListener('resize', requestScrollUpdate);
  }
  scrollCallbacks.add(callback);
  callback();
  return () => {
    scrollCallbacks.delete(callback);
    if (!scrollCallbacks.size) {
      window.removeEventListener('scroll', requestScrollUpdate);
      window.removeEventListener('resize', requestScrollUpdate);
      cancelAnimationFrame(scrollFrame);
      scrollFrame = 0;
    }
  };
}
