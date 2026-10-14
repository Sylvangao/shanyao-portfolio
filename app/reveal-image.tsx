'use client';

import { useEffect, useRef } from 'react';
import type { ImgHTMLAttributes } from 'react';

// Image surfaces follow the same font-ready, viewport-driven entrance as copy.
export function RevealImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const image = ref.current;
    if (!image) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let disposed = false;
    let animation: Animation | undefined;
    let observer: IntersectionObserver | undefined;
    const show = () => {
      if (disposed) return;
      image.dataset.revealed = 'true';
      if (motion.matches) return;
      animation = image.animate([
        { opacity: .001, filter: 'blur(10px)', transform: 'translateY(10px)' },
        { opacity: 1, filter: 'blur(0px)', transform: 'translateY(0)' },
      ], { duration: 500, easing: 'cubic-bezier(.44,0,.56,1)', fill: 'both' });
      animation.finished.then(() => animation?.cancel(), () => {});
    };
    document.fonts.ready.then(() => {
      if (disposed) return;
      observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          observer?.disconnect();
          show();
        }
      }, { threshold: .1 });
      observer.observe(image);
    });
    const reduce = () => { if (motion.matches) { animation?.cancel(); image.dataset.revealed = 'true'; } };
    motion.addEventListener('change', reduce);
    return () => { disposed = true; observer?.disconnect(); animation?.cancel(); motion.removeEventListener('change', reduce); };
  }, []);
  return <img {...props} ref={ref} data-reveal-media />;
}
