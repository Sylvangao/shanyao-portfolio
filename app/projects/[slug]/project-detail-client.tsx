'use client';

import { useLanguage } from '../../use-language';
import { TextReveal } from '../../text-reveal';
import { SiteHeader } from '../../site-header';

export function ProjectDetailClient({
  project,
}: {
  project: { en: string; zh: string; tone: string };
}) {
  const lang = useLanguage();
  const zh = lang === 'zh';
  return (
    <main className="project-detail-page" lang={zh ? 'zh-CN' : 'en'}>
      <SiteHeader active="work" lang={lang} />
      <section className="project-detail-hero">
        <a href={`../../work/?lang=${lang}`} className="project-back">
          <TextReveal>{zh ? '← 返回作品集' : '← Back to portfolio'}</TextReveal>
        </a>
        <p>
          <TextReveal delay={100}>{zh ? '项目案例' : 'Case study'}</TextReveal>
        </p>
        <h1>
          <TextReveal delay={200}>{zh ? project.zh : project.en}</TextReveal>
        </h1>
      </section>
      <section className={`project-detail-cover portfolio-${project.tone}`} aria-hidden="true">
        <span className="portfolio-orb portfolio-orb-a" />
        <span className="portfolio-orb portfolio-orb-b" />
      </section>
      <p className="project-detail-placeholder">
        <TextReveal>
          {zh
            ? '完整案例内容将在你提供项目素材后加入。'
            : 'Full case study content will be added when the project material is ready.'}
        </TextReveal>
      </p>
    </main>
  );
}
