'use client';

import { Fragment, useEffect, useRef } from 'react';

// Keep real whitespace for selection, accessibility and natural line wrapping.
function tokens(text: string) {
  const result: string[] = [];
  for (const token of text.split(/(\s+|[\p{Script=Han}])/u).filter(Boolean)) {
    if (/^[，。！？、；：,.!?;:]+$/u.test(token) && result.length) result[result.length - 1] += token;
    else result.push(token);
  }
  return result;
}

export function TextReveal({ children, delay = 0, active, granularity = 'auto', syncMedia = false }: { children: string; delay?: number; active?: boolean; granularity?: 'auto' | 'word' | 'line'; syncMedia?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element?.closest('.work-page, .resume-page') || active === false) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) return;
    const lineMode = granularity === 'line' || (granularity === 'auto' && !!element.closest('.resume-page') && !element.closest('.site-header, .site-footer'));
    const resumeLines = lineMode && !!element.closest('.resume-page') && !element.closest('.site-footer');
    const lineInterval = resumeLines ? 300 : 100;
    const duration = resumeLines ? 500 : 400;
    // A pill's surface and copy share one animation, trigger and delay.
    const surface = element.closest<HTMLElement>('[data-reveal-surface], [data-reveal-nav]');
    const words = surface ? [surface] : Array.from(element.querySelectorAll<HTMLElement>('[data-reveal-token]'));
    const animations = words.map((word, index) => {
      const animation = word.animate([
        { opacity: .001, filter: 'blur(10px)', transform: 'translateY(10px)' },
        { opacity: 1, filter: 'blur(0px)', transform: 'translateY(0)' },
      ], { duration, delay: delay + (lineMode ? 0 : index * 50), easing: 'cubic-bezier(.44,0,.56,1)', fill: 'both' });
      animation.pause();
      return animation;
    });
    const media = syncMedia ? element.closest('.resume-entry-header')?.querySelector<HTMLElement>('[data-reveal-media]') : null;
    if (media) {
      const animation = media.animate([
        { opacity: .001, filter: 'blur(10px)', transform: 'translateY(10px)' },
        { opacity: 1, filter: 'blur(0px)', transform: 'translateY(0)' },
      ], { duration, delay, easing: 'cubic-bezier(.44,0,.56,1)', fill: 'both' });
      animation.pause();
      animations.push(animation);
    }
    let disposed = false;
    let ready = false;
    const popover = element.closest<HTMLElement>('.contact-popover');
    let visible = active === true && !!popover;
    let started = false;
    const contact = popover?.closest('.contact-action');
    const play = () => {
      if (disposed || started || !ready || !visible) return;
      if (active !== true && popover && getComputedStyle(popover).visibility === 'hidden') return;
      started = true;
      if (media) media.dataset.revealed = 'true';
      if (surface) surface.dataset.revealed = 'true';
      if (lineMode) {
        // Measure actual responsive lines after fonts have loaded, immediately
        // before playback. Every word on one rendered line shares its delay.
        const lines: number[] = [];
        words.forEach((word, index) => {
          const top = word.getBoundingClientRect().top;
          let line = lines.findIndex(value => Math.abs(value - top) < 3);
          if (line === -1) { line = lines.length; lines.push(top); }
          animations[index].effect?.updateTiming({ delay: delay + line * lineInterval });
          word.dataset.revealLine = `${line}`;
        });
      }
      animations.forEach(animation => {
        animation.play();
        // Drop fill effects after completion so completed words remain ordinary text.
        animation.finished.then(() => animation.cancel(), () => {});
      });
    };
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        visible = true;
        observer.disconnect();
        play();
      }
    }, { threshold: .1 });
    observer.observe(element);
    const revealPopover = () => requestAnimationFrame(play);
    contact?.addEventListener('pointerenter', revealPopover);
    contact?.addEventListener('focusin', revealPopover);
    contact?.addEventListener('click', revealPopover);
    const timer = window.setTimeout(() => { ready = true; play(); }, 2000);
    document.fonts.ready.then(() => { ready = true; play(); });
    const stopMotion = () => { if (reducedMotion.matches) animations.forEach(animation => animation.cancel()); };
    reducedMotion.addEventListener('change', stopMotion);
    return () => {
      disposed = true;
      observer.disconnect();
      contact?.removeEventListener('pointerenter', revealPopover);
      contact?.removeEventListener('focusin', revealPopover);
      contact?.removeEventListener('click', revealPopover);
      clearTimeout(timer);
      reducedMotion.removeEventListener('change', stopMotion);
      animations.forEach(animation => animation.cancel());
    };
  }, [children, delay, active, granularity, syncMedia]);

  return <span className="text-reveal" ref={ref}>{tokens(children).map((token, index) =>
    /^\s+$/u.test(token)
      ? <Fragment key={index}>{token}</Fragment>
      : <span className="text-reveal-token" data-reveal-token key={index}>{token}</span>
  )}</span>;
}
