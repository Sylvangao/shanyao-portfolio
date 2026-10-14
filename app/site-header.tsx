'use client';

import { TextReveal } from './text-reveal';
import { useEffect, useRef } from 'react';

export function SiteHeader({ active, lang }: { active: 'work' | 'resume'; lang: 'zh' | 'en' }) {
  const headerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    let previous = Math.max(0, window.scrollY);
    let directionStart = previous;
    let direction = 0;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = Math.max(0, window.scrollY);
      header.dataset.compact = `${y > 10}`;
      header.style.setProperty('--header-progress', y > 10 ? '1' : '0');
      header.dataset.scrolled = `${y > 10}`;
      if (y <= 80) {
        header.dataset.hidden = 'false';
        directionStart = y;
      } else {
        const delta = y - previous;
        const nextDirection = Math.sign(delta);
        if (nextDirection && nextDirection !== direction) {
          directionStart = previous;
          direction = nextDirection;
        }
        // Ignore tiny trackpad reversals so the header doesn't flicker.
        if (Math.abs(y - directionStart) > 120) header.dataset.hidden = `${direction > 0}`;
      }
      previous = y;
    };
    const request = () => { if (!frame) frame = requestAnimationFrame(update); };
    const show = () => { header.dataset.hidden = 'false'; };
    update();
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
    header.addEventListener('focusin', show);
    header.addEventListener('pointerenter', show);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', request);
      window.removeEventListener('resize', request);
      header.removeEventListener('focusin', show);
      header.removeEventListener('pointerenter', show);
    };
  }, []);
  const suffix = lang === 'zh' ? '?lang=zh' : '?lang=en';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  return (
    <header
      ref={headerRef}
      className="site-header shape-header"
    >
      <a className="wordmark" href={`${basePath}/work/${suffix}`} aria-label="Shanyao work">
        <b><TextReveal>Shanyao</TextReveal></b>
      </a>
      <nav className={`page-tabs active-${active}`} aria-label="Primary navigation">
        <span className="tab-glider" aria-hidden="true" />
        <a className={active === 'work' ? 'active' : ''} href={`${basePath}/work/${suffix}`}><TextReveal delay={50}>Work</TextReveal></a>
        <a className={active === 'resume' ? 'active' : ''} href={`${basePath}/resume/${suffix}`}><TextReveal delay={100}>Resume</TextReveal></a>
      </nav>
      <a className="language-switch" href={`${basePath}/${active === 'work' ? 'work' : 'resume'}/?lang=${lang === 'zh' ? 'en' : 'zh'}`} aria-label={lang === 'zh' ? 'Switch to English' : '切换到中文'}>
        <span className={lang === 'en' ? 'selected' : ''}><TextReveal delay={150}>EN</TextReveal></span><i /><span className={lang === 'zh' ? 'selected' : ''}><TextReveal delay={200}>中</TextReveal></span>
      </a>
    </header>
  );
}
