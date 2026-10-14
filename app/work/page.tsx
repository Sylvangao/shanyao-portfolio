'use client';

import { useEffect, useState } from 'react';
import { TextReveal } from '../text-reveal';
import { SiteHeader } from '../site-header';
import { FocusHeadline } from '../focus-headline';
import { ContactPopover } from '../contact-popover';
import { SiteFooter } from '../site-footer';
import { GlassSection } from '../glass-section';
import { projects } from '../project-data';

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
  const [lang, setLang] = useState<'zh' | 'en'>('en');
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
    if ('fonts' in document) {
      Promise.all([
        document.fonts.load('100 82px "Google Sans"'),
        document.fonts.load('850 82px "Google Sans"'),
      ]).then(reveal, reveal);
    } else {
      reveal();
    }
    return () => {
      active = false;
      document.documentElement.classList.remove('fonts-ready');
    };
  }, []);
  useEffect(() => {
    setLang(new URLSearchParams(window.location.search).get('lang') === 'zh' ? 'zh' : 'en');
  }, []);
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>('.work-hero');
    const headline = document.querySelector<HTMLElement>('.focus-stage');
    const cards = Array.from(document.querySelectorAll<HTMLElement>('.project-card'));
    const portfolioCards = Array.from(document.querySelectorAll<HTMLElement>('.portfolio-card'));
    const overlapSections = Array.from(document.querySelectorAll<HTMLElement>('.overlap-section')).map((section) => ({
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
    const updateParallax = () => {
      if (reduceMotion.matches) {
        frame = 0;
        return;
      }
      // Read layout once before writing animated styles. Offset positions exclude
      // transforms, so an animation never changes its own next input.
      const measured = new Map<HTMLElement, { top: number; height: number }>();
      [hero, ...cards, ...portfolioCards, ...overlapSections.map(({ section }) => section), valueSection, ...valueCards].forEach((element) => {
        if (!element || measured.has(element)) return;
        let top = 0;
        let ancestor: HTMLElement | null = element;
        while (ancestor) {
          top += ancestor.offsetTop;
          ancestor = ancestor.offsetParent as HTMLElement | null;
        }
        measured.set(element, { top: top - targetScroll, height: element.offsetHeight });
      });
      smoothScroll += (targetScroll - smoothScroll) * .11;
      const lag = targetScroll - smoothScroll;
      const heroShift = Math.max(-78, Math.min(78, lag * .38));
      const ambienceShift = Math.max(-24, Math.min(24, lag * .1));
      hero?.style.setProperty('--hero-shift', `${heroShift}px`);
      hero?.style.setProperty('--ambience-shift', `${ambienceShift}px`);
      const viewportCenter = window.innerHeight / 2;
      const strengths = [.022, .034, .026];
      cards.forEach((card, index) => {
        const rect = measured.get(card)!;
        const distance = rect.top + rect.height / 2 - viewportCenter;
        const shift = Math.max(-24, Math.min(24, -distance * strengths[index % strengths.length]));
        card.style.setProperty('--card-shift', `${shift}px`);
      });
      overlapSections.forEach(({ section, title, cards: sectionCards }) => {
        if (!title) return;
        const rect = measured.get(section)!;
        const progress = Math.max(0, Math.min(1, (window.innerHeight * .72 + 240 - rect.top) / (window.innerHeight * .62)));
        const eased = progress * progress * (3 - 2 * progress);
        const titleReveal = Math.max(0, Math.min(1, (progress - .55) / .35));
        const titleRevealEased = titleReveal * titleReveal * (3 - 2 * titleReveal);
        title.style.setProperty('--overlap-progress', `${titleRevealEased}`);
        title.style.setProperty('--overlap-title-shift', `${(1 - eased) * 100}px`);
          sectionCards.forEach((card, index) => {
            // Stacked cards must reveal as each card enters the viewport.
            const cardRect = measured.get(card)!;
            const cardProgress = window.innerWidth <= 1024
              ? Math.max(0, Math.min(1, (window.innerHeight * .94 - cardRect.top) / Math.min(window.innerHeight * .65, cardRect.height)))
              : index < (section.classList.contains('portfolio-section') ? 2 : 3) ? progress : Math.max(0, Math.min(1, (window.innerHeight * .94 - cardRect.top) / Math.min(window.innerHeight * .65, cardRect.height)));
            const columns = section.classList.contains('portfolio-section') ? 2 : 3;
            const staggerIndex = window.innerWidth <= 1024 ? 0 : index % columns;
            const motionStart = .08 + staggerIndex * .09;
            const motion = Math.max(0, Math.min(1, (cardProgress - motionStart) / .32));
            const motionEased = motion * motion * (3 - 2 * motion);
            const shellStart = .06 + staggerIndex * .08;
            const shell = Math.max(0, Math.min(1, (cardProgress - shellStart) / .28));
            const shellEased = shell * shell * (3 - 2 * shell);
            const blur = Math.max(0, Math.min(1, (cardProgress - .72) / .18));
            const blurEased = blur * blur * (3 - 2 * blur);
            const start = .36 + staggerIndex * .05;
            const reveal = Math.max(0, Math.min(1, (cardProgress - start) / .22));
            const revealEased = reveal * reveal * (3 - 2 * reveal);
            const copyStart = start + .16;
            const copyReveal = Math.max(0, Math.min(1, (cardProgress - copyStart) / .26));
            const copyEased = copyReveal * copyReveal * (3 - 2 * copyReveal);
            card.style.setProperty('--value-shell-reveal', `${shellEased}`);
            card.style.setProperty('--value-blur-reveal', `${blurEased}`);
            card.style.setProperty('--value-card-reveal', `${revealEased}`);
            card.style.setProperty('--value-copy-reveal', `${copyEased}`);
            card.style.setProperty('--value-card-shift', `${(1 - motionEased) * 44 + eased * 16}px`);
          });
      });
      if (Math.abs(lag) > .1) {
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
    requestParallax();
    window.addEventListener('scroll', requestParallax, { passive: true });
    window.addEventListener('resize', requestParallax);
    return () => {
      orbitObserver.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestParallax);
      window.removeEventListener('resize', requestParallax);
    };
  }, []);
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
              <span className="intro-line"><TextReveal delay={450} syncMedia>{zh ? '我是山药' : 'I’m Shanyao'}</TextReveal>{' '}<span className="waving-hand" role="img" aria-label={zh ? '挥手' : 'Waving hand'}><TextReveal delay={500}>👋</TextReveal></span></span>
              <span className="intro-line"><TextReveal delay={550}>{zh ? '一名独立产品设计师。' : 'an independent product designer.'}</TextReveal></span>
              <span className="intro-line"><TextReveal delay={650}>{zh ? '拥有 13 年经验，曾就职于百度、魅族、知乎与腾讯。' : 'Across 13 years at Baidu, Meizu, Zhihu and Tencent,'}</TextReveal></span>
              <span className="intro-line"><TextReveal delay={850}>{zh ? '我专注于将复杂想法转化为清晰、有效的数字产品。' : 'I’ve turned complex ideas into clear digital products that work.'}</TextReveal></span>
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
          <ContactPopover lang={lang} />
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
          {projects.map((project) => (
            <a className="project-card portfolio-card" href={`${basePath}/projects/${project.slug}/?lang=${lang}`} aria-label={zh ? `查看${project.zh}` : `View ${project.en}`} key={project.slug}>
              <div className="portfolio-thumb portfolio-glass" data-backdrop={zh ? '精选项目' : 'Projects'}>
                {project.cover && <img className="portfolio-cover" src={`${basePath}${project.cover}`} alt={zh ? project.zh : project.en} loading="lazy" decoding="async" />}
                <div className="project-label-notch">
                  <svg className="project-notch-curve project-notch-top" viewBox="0 0 24 24" aria-hidden="true"><path d="M24 0H0A24 24 0 0 1 24 24Z" /></svg>
                  <svg className="project-notch-curve project-notch-right" viewBox="0 0 24 24" aria-hidden="true"><path d="M24 0H0A24 24 0 0 1 24 24Z" /></svg>
                  <div className="service-tags project-labels">{project.labels.map((label,index)=><span className="service-label" key={`${label}-${index}`}>{label}</span>)}</div>
                </div>
                <span className="portfolio-arrow" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round"><path d="M6 14 14 6M6.5 6H14v7.5"/></svg></span>
              </div>
            </a>
          ))}
        </div>
      </GlassSection>
      <SiteFooter lang={lang} />
    </main>
  );
}
