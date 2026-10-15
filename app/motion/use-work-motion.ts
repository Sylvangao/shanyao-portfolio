'use client';

import { useEffect } from 'react';
import { whenFontsReady } from './runtime';

export function useWorkMotion() {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>('.work-hero');
    const headline = document.querySelector<HTMLElement>('.focus-stage');
    const cards = Array.from(document.querySelectorAll<HTMLElement>('.project-card'));
    const overlapSections = Array.from(
      document.querySelectorAll<HTMLElement>('.overlap-section'),
    ).map((section) => ({
      section,
      title: section.querySelector<HTMLElement>('.overlap-heading'),
      cards: Array.from(section.querySelectorAll<HTMLElement>('.value-card, .portfolio-card')),
    }));
    const valueSection = document.querySelector<HTMLElement>('.value-section');
    const valueCards = Array.from(document.querySelectorAll<HTMLElement>('.value-card'));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const alignOrbit = () => {
      if (!hero || !headline) return;
      let top = 0;
      let element: HTMLElement | null = headline;
      while (element && element !== hero) {
        top += element.offsetTop;
        element = element.offsetParent as HTMLElement | null;
      }
      hero.style.setProperty('--orbit-center-y', `${top + headline.offsetHeight / 2}px`);
    };
    const orbitObserver = new ResizeObserver(alignOrbit);
    if (hero) orbitObserver.observe(hero);
    if (headline) orbitObserver.observe(headline);
    alignOrbit();
    let frame = 0;
    let targetScroll = window.scrollY;
    let smoothScroll = targetScroll;
    // Cache document-space geometry; scrolling only updates progress, not layout.
    const layout = new Map<HTMLElement, { top: number; height: number }>();
    const measuredElements = Array.from(
      new Set([
        hero,
        ...cards,
        ...overlapSections.map(({ section }) => section),
        valueSection,
        ...valueCards,
      ]),
    ).filter((element): element is HTMLElement => !!element);
    const measureLayout = () => {
      for (const element of measuredElements) {
        let top = 0;
        let ancestor: HTMLElement | null = element;
        while (ancestor) {
          top += ancestor.offsetTop;
          ancestor = ancestor.offsetParent as HTMLElement | null;
        }
        layout.set(element, { top, height: element.offsetHeight });
      }
    };
    measureLayout();
    const updateParallax = () => {
      if (reduceMotion.matches) {
        frame = 0;
        return;
      }
      const measured = new Map(
        Array.from(layout, ([element, rect]) => [
          element,
          { top: rect.top - targetScroll, height: rect.height },
        ]),
      );
      smoothScroll += (targetScroll - smoothScroll) * 0.11;
      const lag = targetScroll - smoothScroll;
      const heroShift = Math.max(-78, Math.min(78, lag * 0.38));
      const ambienceShift = Math.max(-24, Math.min(24, lag * 0.1));
      hero?.style.setProperty('--hero-shift', `${heroShift}px`);
      hero?.style.setProperty('--ambience-shift', `${ambienceShift}px`);
      const viewportCenter = window.innerHeight / 2;
      const strengths = [0.022, 0.034, 0.026];
      cards.forEach((card, index) => {
        const rect = measured.get(card)!;
        const distance = rect.top + rect.height / 2 - viewportCenter;
        const shift = Math.max(-24, Math.min(24, -distance * strengths[index % strengths.length]));
        card.style.setProperty('--card-shift', `${shift}px`);
      });
      overlapSections.forEach(({ section, title, cards: sectionCards }) => {
        if (!title) return;
        const rect = measured.get(section)!;
        const progress = Math.max(
          0,
          Math.min(1, (window.innerHeight * 0.72 + 240 - rect.top) / (window.innerHeight * 0.62)),
        );
        const eased = progress * progress * (3 - 2 * progress);
        const titleReveal = Math.max(0, Math.min(1, (progress - 0.55) / 0.35));
        const titleRevealEased = titleReveal * titleReveal * (3 - 2 * titleReveal);
        title.style.setProperty('--overlap-progress', `${titleRevealEased}`);
        title.style.setProperty('--overlap-title-shift', `${(1 - eased) * 100}px`);
        sectionCards.forEach((card, index) => {
          // Stacked cards must reveal as each card enters the viewport.
          const cardRect = measured.get(card)!;
          const cardProgress =
            window.innerWidth <= 1024
              ? Math.max(
                  0,
                  Math.min(
                    1,
                    (window.innerHeight * 0.94 - cardRect.top) /
                      Math.min(window.innerHeight * 0.65, cardRect.height),
                  ),
                )
              : index < (section.classList.contains('portfolio-section') ? 2 : 3)
                ? progress
                : Math.max(
                    0,
                    Math.min(
                      1,
                      (window.innerHeight * 0.94 - cardRect.top) /
                        Math.min(window.innerHeight * 0.65, cardRect.height),
                    ),
                  );
          const columns = section.classList.contains('portfolio-section') ? 2 : 3;
          const staggerIndex = window.innerWidth <= 1024 ? 0 : index % columns;
          const motionStart = 0.08 + staggerIndex * 0.09;
          const motion = Math.max(0, Math.min(1, (cardProgress - motionStart) / 0.32));
          const motionEased = motion * motion * (3 - 2 * motion);
          const shellStart = 0.06 + staggerIndex * 0.08;
          const shell = Math.max(0, Math.min(1, (cardProgress - shellStart) / 0.28));
          const shellEased = shell * shell * (3 - 2 * shell);
          const blur = Math.max(0, Math.min(1, (cardProgress - 0.72) / 0.18));
          const blurEased = blur * blur * (3 - 2 * blur);
          const start = 0.36 + staggerIndex * 0.05;
          const reveal = Math.max(0, Math.min(1, (cardProgress - start) / 0.22));
          const revealEased = reveal * reveal * (3 - 2 * reveal);
          const copyStart = start + 0.16;
          const copyReveal = Math.max(0, Math.min(1, (cardProgress - copyStart) / 0.26));
          const copyEased = copyReveal * copyReveal * (3 - 2 * copyReveal);
          card.style.setProperty('--value-shell-reveal', `${shellEased}`);
          card.style.setProperty('--value-blur-reveal', `${blurEased}`);
          card.style.setProperty('--value-card-reveal', `${revealEased}`);
          card.style.setProperty('--value-copy-reveal', `${copyEased}`);
          card.style.setProperty('--value-card-shift', `${(1 - motionEased) * 44 + eased * 16}px`);
        });
      });
      if (Math.abs(lag) > 0.1) {
        frame = window.requestAnimationFrame(updateParallax);
      } else {
        smoothScroll = targetScroll;
        hero?.style.setProperty('--hero-shift', '0px');
        hero?.style.setProperty('--ambience-shift', '0px');
        frame = 0;
      }
    };
    const requestParallax = () => {
      targetScroll = window.scrollY;
      if (!frame) frame = window.requestAnimationFrame(updateParallax);
    };
    const onResize = () => {
      measureLayout();
      alignOrbit();
      requestParallax();
    };
    const layoutObserver = new ResizeObserver(onResize);
    measuredElements.forEach((element) => layoutObserver.observe(element));
    whenFontsReady().then(() => {
      if (!disposed) onResize();
    });
    let disposed = false;
    requestParallax();
    window.addEventListener('scroll', requestParallax, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      disposed = true;
      orbitObserver.disconnect();
      layoutObserver.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestParallax);
      window.removeEventListener('resize', onResize);
    };
  }, []);
}
