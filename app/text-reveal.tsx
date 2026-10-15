'use client';

import { Fragment, useEffect, useRef } from 'react';
import {
  motion,
  observeEntrance,
  observeMotionPreference,
  prefersReducedMotion,
  revealElement,
  whenFontsReady,
} from './motion/runtime';

// Preserve whitespace for selection and responsive wrapping, including Chinese.
function tokens(text: string) {
  const result: string[] = [];
  for (const token of text.split(/(\s+|[\p{Script=Han}])/u).filter(Boolean)) {
    if (/^[，。！？、；：,.!?;:]+$/u.test(token) && result.length)
      result[result.length - 1] += token;
    else result.push(token);
  }
  return result;
}

export function TextReveal({
  children,
  delay = 0,
  active,
  granularity = 'auto',
  syncMedia = false,
}: {
  children: string;
  delay?: number;
  active?: boolean;
  granularity?: 'auto' | 'word' | 'line';
  syncMedia?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element?.closest('.work-page, .resume-page, .project-detail-page')) return;
    element.dataset.motionState = 'pending';
    if (active === false) return;
    const surface = element.closest<HTMLElement>('[data-reveal-surface], [data-reveal-nav]');
    const media = syncMedia
      ? element
          .closest('[data-reveal-scope], .resume-entry-header')
          ?.querySelector<HTMLElement>('[data-reveal-media]')
      : null;
    const markVisible = () => {
      element.dataset.motionState = 'ready';
      if (surface) surface.dataset.revealed = 'true';
      if (media) media.dataset.revealed = 'true';
    };
    if (prefersReducedMotion()) {
      markVisible();
      return;
    }
    const lineMode =
      granularity === 'line' ||
      (granularity === 'auto' &&
        !!element.closest('.resume-page') &&
        !element.closest('.site-header, .site-footer'));
    const resumeLines =
      lineMode && !!element.closest('.resume-page') && !element.closest('.site-footer');
    const duration = resumeLines ? motion.resumeDuration : motion.revealDuration;
    const interval = resumeLines ? motion.resumeLineInterval : motion.lineInterval;
    const words = surface
      ? [surface]
      : Array.from(element.querySelectorAll<HTMLElement>('[data-reveal-token]'));
    const popover = element.closest<HTMLElement>('.contact-popover');
    const contact = popover?.closest('.contact-action');
    let visible = active === true && !!popover;
    let ready = false;
    let disposed = false;
    let started = false;
    let pendingFrame = 0;
    const animations: Animation[] = [];
    const play = () => {
      if (disposed || started || !ready || !visible) return;
      if (active !== true && popover && getComputedStyle(popover).visibility === 'hidden') return;
      started = true;
      markVisible();
      // Measure all lines before starting animations or writing styles.
      const lines: number[] = [];
      const delays = words.map((word, index) => {
        if (!lineMode) return delay + index * motion.wordInterval;
        const top = word.getBoundingClientRect().top;
        let line = lines.findIndex((value) => Math.abs(value - top) < 3);
        if (line === -1) {
          line = lines.length;
          lines.push(top);
        }
        return delay + line * interval;
      });
      words.forEach((word, index) => animations.push(revealElement(word, duration, delays[index])));
      if (media) animations.push(revealElement(media, duration, delay));
    };
    const stopObserving = observeEntrance(element, () => {
      visible = true;
      play();
    });
    const revealPopover = () => {
      cancelAnimationFrame(pendingFrame);
      pendingFrame = requestAnimationFrame(play);
    };
    contact?.addEventListener('pointerenter', revealPopover);
    contact?.addEventListener('focusin', revealPopover);
    contact?.addEventListener('click', revealPopover);
    whenFontsReady().then(() => {
      ready = true;
      play();
    });
    const stopMotion = observeMotionPreference((reduced) => {
      if (!reduced) return;
      started = true;
      markVisible();
      animations.forEach((animation) => animation.cancel());
    });
    return () => {
      disposed = true;
      stopObserving();
      stopMotion();
      cancelAnimationFrame(pendingFrame);
      contact?.removeEventListener('pointerenter', revealPopover);
      contact?.removeEventListener('focusin', revealPopover);
      contact?.removeEventListener('click', revealPopover);
      animations.forEach((animation) => animation.cancel());
    };
  }, [children, delay, active, granularity, syncMedia]);

  return (
    <span className="text-reveal" data-motion-state="pending" ref={ref}>
      {tokens(children).map((token, index) =>
        /^\s+$/u.test(token) ? (
          <Fragment key={index}>{token}</Fragment>
        ) : (
          <span className="text-reveal-token" data-reveal-token key={index}>
            {token}
          </span>
        ),
      )}
    </span>
  );
}
