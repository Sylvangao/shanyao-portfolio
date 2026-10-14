'use client';

import { TextReveal } from './text-reveal';

export function SiteHeader({ active, lang }: { active: 'work' | 'resume'; lang: 'zh' | 'en' }) {
  const suffix = lang === 'zh' ? '?lang=zh' : '?lang=en';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  return (
    <header
      className="site-header shape-header"
    >
      <a className="wordmark" href={`${basePath}/work/${suffix}`} aria-label="Shanyao work">
        <b><TextReveal>Shanyao</TextReveal></b>
      </a>
      <nav className={`page-tabs active-${active}`} aria-label="Primary navigation">
        <span className="tab-glider" aria-hidden="true" />
        <a className={active === 'work' ? 'active' : ''} aria-current={active === 'work' ? 'page' : undefined} href={`${basePath}/work/${suffix}`}><TextReveal delay={50}>Work</TextReveal></a>
        <a className={active === 'resume' ? 'active' : ''} aria-current={active === 'resume' ? 'page' : undefined} href={`${basePath}/resume/${suffix}`}><TextReveal delay={100}>Resume</TextReveal></a>
      </nav>
      <a className="language-switch" href={`${basePath}/${active === 'work' ? 'work' : 'resume'}/?lang=${lang === 'zh' ? 'en' : 'zh'}`} aria-label={lang === 'zh' ? 'Switch to English' : '切换到中文'}>
        <span className={lang === 'en' ? 'selected' : ''}><TextReveal delay={150}>EN</TextReveal></span><i /><span className={lang === 'zh' ? 'selected' : ''}><TextReveal delay={200}>中</TextReveal></span>
      </a>
    </header>
  );
}
