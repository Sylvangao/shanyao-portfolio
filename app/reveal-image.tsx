'use client';

import { useEffect, useRef, type ImgHTMLAttributes } from 'react';
import {
  motion,
  observeEntrance,
  observeMotionPreference,
  prefersReducedMotion,
  revealElement,
  whenFontsReady,
} from './motion/runtime';

export function RevealImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const image = ref.current;
    if (!image) return;
    let disposed = false;
    let animation: Animation | undefined;
    let stopObserving: (() => void) | undefined;
    const show = () => {
      if (disposed) return;
      image.dataset.revealed = 'true';
      if (!prefersReducedMotion()) animation = revealElement(image, motion.resumeDuration);
    };
    whenFontsReady().then(() => {
      if (!disposed) stopObserving = observeEntrance(image, show);
    });
    const stopMotion = observeMotionPreference((reduced) => {
      if (reduced) {
        animation?.cancel();
        image.dataset.revealed = 'true';
      }
    });
    return () => {
      disposed = true;
      stopObserving?.();
      stopMotion();
      animation?.cancel();
    };
  }, []);
  return <img {...props} alt={props.alt ?? ''} ref={ref} data-reveal-media />;
}
