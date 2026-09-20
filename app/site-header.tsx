'use client';

import { useEffect } from 'react';
import type { CSSProperties } from 'react';
import { injectLiquidGlassFilter } from '@dpawlikowski/liquid-glass';

export function SiteHeader({ active, lang }: { active: 'work' | 'resume'; lang: 'zh' | 'en' }) {
  useEffect(() => { injectLiquidGlassFilter({ scale:14, animate:false }); }, []);
  const suffix = lang === 'zh' ? '?lang=zh' : '?lang=en';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  return (
    <header
      className="site-header liquid-glass liquid-glass--subtle"
      style={{ '--lg-radius':'22px', '--lg-blur':'14px', '--lg-saturate':'155%', '--lg-opacity':.12, '--lg-shadow':'0 14px 44px rgb(25 36 60 / .12)', '--lg-edge-red':'transparent', '--lg-edge-cyan':'transparent' } as CSSProperties}
    >
      <span className="liquid-glass__refraction" aria-hidden="true" />
      <a className="wordmark" href={`${basePath}/work/${suffix}`} aria-label="Shanyao work">
        <img src={`${basePath}/favicon.svg`} alt="" aria-hidden="true" />
        <b>Shanyao<span className="registered-mark">®</span></b>
      </a>
      <nav className={`page-tabs active-${active}`} aria-label="Primary navigation">
        <span className="tab-glider" aria-hidden="true" />
        <a className={active === 'work' ? 'active' : ''} href={`${basePath}/work/${suffix}`}>Work</a>
        <a className={active === 'resume' ? 'active' : ''} href={`${basePath}/resume/${suffix}`}>Resume</a>
      </nav>
      <a className="language-switch" href={`${basePath}/${active === 'work' ? 'work' : 'resume'}/?lang=${lang === 'zh' ? 'en' : 'zh'}`} aria-label={lang === 'zh' ? 'Switch to English' : '切换到中文'}>
        <span className={lang === 'en' ? 'selected' : ''}>EN</span><i /><span className={lang === 'zh' ? 'selected' : ''}>中</span>
      </a>
    </header>
  );
}
