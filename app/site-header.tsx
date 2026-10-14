'use client';

import { useEffect, useRef } from 'react';
import { TextReveal } from './text-reveal';

export function SiteHeader({ active, lang }: { active: 'work' | 'resume'; lang: 'zh' | 'en' }) {
  const headerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      header.dataset.compact = `${window.scrollY > 10}`;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
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
        <a className={active === 'work' ? 'active' : ''} data-reveal-nav={active === 'work' ? '' : undefined} aria-current={active === 'work' ? 'page' : undefined} href={`${basePath}/work/${suffix}`}><TextReveal delay={50}>Work</TextReveal></a>
        <a className={active === 'resume' ? 'active' : ''} data-reveal-nav={active === 'resume' ? '' : undefined} aria-current={active === 'resume' ? 'page' : undefined} href={`${basePath}/resume/${suffix}`}><TextReveal delay={100}>Resume</TextReveal></a>
      </nav>
      <a className="language-switch" href={`${basePath}/${active === 'work' ? 'work' : 'resume'}/?lang=${lang === 'zh' ? 'en' : 'zh'}`} aria-label={lang === 'zh' ? 'Switch to English' : '切换到中文'}>
        <span className={lang === 'en' ? 'selected' : ''}><TextReveal delay={150}>EN</TextReveal></span><i /><span className={lang === 'zh' ? 'selected' : ''}><TextReveal delay={200}>中</TextReveal></span>
      </a>
    </header>
  );
}
