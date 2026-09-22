'use client';

import { useEffect, useState } from 'react';
import { SiteHeader } from '../../site-header';

export function ProjectDetailClient({ project }: { project: { en: string; zh: string; tone: string } }) {
  const [lang, setLang] = useState<'zh' | 'en'>('en');
  useEffect(() => {
    setLang(new URLSearchParams(window.location.search).get('lang') === 'zh' ? 'zh' : 'en');
  }, []);
  const zh = lang === 'zh';
  return (
    <main className="project-detail-page" lang={zh ? 'zh-CN' : 'en'}>
      <SiteHeader active="work" lang={lang} />
      <section className="project-detail-hero">
        <a href={`../../work/?lang=${lang}`} className="project-back">← {zh ? '返回作品集' : 'Back to portfolio'}</a>
        <p>{zh ? '项目案例' : 'Case study'}</p>
        <h1>{zh ? project.zh : project.en}</h1>
      </section>
      <section className={`project-detail-cover portfolio-${project.tone}`} aria-hidden="true"><span className="portfolio-orb portfolio-orb-a" /><span className="portfolio-orb portfolio-orb-b" /></section>
      <p className="project-detail-placeholder">{zh ? '完整案例内容将在你提供项目素材后加入。' : 'Full case study content will be added when the project material is ready.'}</p>
    </main>
  );
}
