'use client';

import { useEffect } from 'react';
import { useLanguage } from '../use-language';
import { whenFontsReady } from '../motion/runtime';
import { useWorkMotion } from '../motion/use-work-motion';
import { TextReveal } from '../text-reveal';
import { SiteHeader } from '../site-header';
import { FocusHeadline } from '../focus-headline';
import { ContactPopover } from '../contact-popover';
import { SiteFooter } from '../site-footer';
import { GlassSection } from '../glass-section';
import { projects } from '../project-data';
import { ProjectCard } from '../project-card';

const advantages = [
  {
    en: 'Ownership',
    zh: '亲自负责',
    enCopy: 'One senior designer from the first conversation to the final detail. No handoffs, no outsourcing—one accountable partner.',
    zhCopy: '从首次沟通到最后一个细节，始终由同一位资深设计师负责。不转手，不外包，对结果负责。',
  },
  {
    en: 'Experience',
    zh: '经验广度',
    enCopy: 'Consumer intuition meets enterprise depth. I move comfortably between growth products, complex systems, SaaS and AI.',
    zhCopy: '既理解消费产品的用户与增长，也熟悉复杂系统、SaaS 与 AI 产品的设计方法。',
  },
  {
    en: 'Clarity',
    zh: '化繁为简',
    enCopy: 'I structure ambiguity, expose the real problem and turn complex workflows into decisions your team can confidently build.',
    zhCopy: '梳理模糊信息，找到真正问题，再将复杂流程转化为团队能够落地的清晰决策。',
  },
];

export default function WorkPage() {
  const lang = useLanguage();
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('theme') !== 'dark') return;
    document.documentElement.dataset.previewTheme = 'dark';
    return () => { delete document.documentElement.dataset.previewTheme; };
  }, []);
  useEffect(() => {
    let active = true;
    const reveal = () => {
      if (active) document.documentElement.classList.add('fonts-ready');
    };
    whenFontsReady().then(reveal);
    return () => {
      active = false;
      document.documentElement.classList.remove('fonts-ready');
    };
  }, []);
  useWorkMotion();

  const zh = lang === 'zh';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  return (
    <main className="work-page" lang={lang === 'zh' ? 'zh-CN' : 'en'}>
      <SiteHeader active="work" lang={lang} />
      <section className="work-hero">
        <div className="ambient-feather" aria-hidden="true" />
        <div className="hero-copy">
          <FocusHeadline words={zh ? ['化繁为简，','设计真正有效的产品。'] : ['Complexity made clear.','Products designed to grow.']} label={zh ? '化繁为简，设计真正有效的产品' : 'Complexity made clear. Products designed to grow'} href={zh ? '/work?lang=zh' : '/work'} emphasis={zh ? ['化繁为简', '有效', '产品'] : ['Complexity', 'clear', 'grow']} />
          <div className="intro-row" data-reveal-scope>
            <img data-reveal-media className="profile-avatar" src={`${basePath}/profile/shanyao-avatar-optimized.svg`} width="58" height="58" alt={zh ? '山药的头像' : 'Portrait of Shanyao'} />
            <div className="hero-note"><p className="hero-introduction">
              <span className="intro-line intro-greeting"><TextReveal delay={450} syncMedia>{zh ? '我是山药' : 'I’m Shanyao'}</TextReveal>{' '}<span className="waving-hand" role="img" aria-label={zh ? '挥手' : 'Waving hand'}><TextReveal delay={500}>👋</TextReveal></span></span>
              <span className="intro-line intro-description"><TextReveal delay={550}>{zh ? '一名独立产品设计师。' : 'an independent product designer.'}</TextReveal>{' '}<TextReveal delay={650}>{zh ? '拥有 13 年经验，曾就职于百度、魅族、知乎与腾讯。' : 'Across 13 years at Baidu, Meizu, Zhihu and Tencent,'}</TextReveal>{' '}<TextReveal delay={850}>{zh ? '我专注于将复杂想法转化为清晰、有效的数字产品。' : 'I’ve turned complex ideas into clear digital products that work.'}</TextReveal></span>
            </p>
          <div className="service-summary" aria-label={zh ? '设计服务范围' : 'Design services'}>
            <ul className="service-tags">
              {(zh
                ? ['App 与网站', 'SaaS 与企业产品', 'AI 产品', '设计系统']
                : ['Apps & websites', 'SaaS & enterprise', 'AI products', 'Design systems']
              ).map((service, index) => <li key={service} data-reveal-surface><TextReveal delay={1600 + index * 100}>{service}</TextReveal></li>)}
            </ul>
          </div>
            </div>
          </div>
          <div className="hero-bottom-actions">
            <ContactPopover lang={lang} />
            <a className="hero-resume-link" data-reveal-surface href={`${basePath}/resume/?lang=${lang}`} aria-label={zh ? '查看我的简历' : 'View my resume'}
              onPointerMove={(event) => {
                if (event.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
                const rect = event.currentTarget.getBoundingClientRect();
                event.currentTarget.style.setProperty('--resume-label-x', `${((event.clientX - rect.left) / rect.width - .5) * 10}px`);
                event.currentTarget.style.setProperty('--resume-label-y', `${((event.clientY - rect.top) / rect.height - .5) * 8}px`);
              }}
              onPointerLeave={(event) => {
                event.currentTarget.style.setProperty('--resume-label-x', '0px');
                event.currentTarget.style.setProperty('--resume-label-y', '0px');
              }}>
              <span className="hero-resume-label"><TextReveal delay={1100}>{zh ? '简历' : 'Resume'}</TextReveal><svg className="hero-resume-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3.5 10h12M10.5 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
            </a>
          </div>
        </div>
      </section>
      <GlassSection className="value-section" id="value-title" title={zh ? '为什么是我' : 'Why me'}>
        <div className="value-cards">
          {advantages.map((item) => (
            <article
              className="value-card"
              key={item.en}
              data-backdrop={zh ? '为什么是我' : 'Why me'}
              style={{
                backdropFilter: 'blur(72px) saturate(112%) brightness(1.08)',
                WebkitBackdropFilter: 'blur(72px) saturate(112%) brightness(1.08)',
              }}
            >
              <h3><TextReveal>{zh ? item.zh : item.en}</TextReveal></h3>
              <p><TextReveal delay={150}>{zh ? item.zhCopy : item.enCopy}</TextReveal></p>
            </article>
          ))}
        </div>
      </GlassSection>
      <GlassSection className="portfolio-section" id="portfolio-title" title={zh ? '精选项目' : 'Projects'}>
        <div className="portfolio-grid">
          {projects.map((project) => <ProjectCard key={project.slug} project={project} lang={lang} basePath={basePath} />)}
        </div>
      </GlassSection>
      <SiteFooter lang={lang} />
    </main>
  );
}
