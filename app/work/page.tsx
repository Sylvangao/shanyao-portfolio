'use client';

import { useEffect, useState } from 'react';
import { SiteHeader } from '../site-header';
import { FocusHeadline } from '../focus-headline';
import { MeshBackground } from '../mesh-background';
import { ContactPopover } from '../contact-popover';

const projects = [
  { index:'01', en:'Product experience', zh:'产品体验设计', enType:'Product design', zhType:'产品设计', year:'2026', tone:'blue' },
  { index:'02', en:'A new identity', zh:'品牌焕新', enType:'Brand system', zhType:'品牌系统', year:'2026', tone:'silver' },
  { index:'03', en:'Digital service', zh:'数字化服务', enType:'UX / Interface', zhType:'体验 / 界面', year:'2025', tone:'green' },
];

const advantages = [
  {
    index: '01',
    en: 'Direct ownership',
    zh: '全程亲自负责',
    enCopy: 'You work directly with me from problem framing to final delivery. No account layers, junior handoffs or outsourced design.',
    zhCopy: '从问题定义、方案推演到最终交付，核心设计工作全程由我亲自完成，没有层层转述或设计转包。',
    enTags: ['Direct communication', 'Senior execution', 'End-to-end'],
    zhTags: ['直接沟通', '资深设计师执行', '全流程负责'],
  },
  {
    index: '02',
    en: 'Broad perspective',
    zh: '横跨 ToC 与 ToB',
    enCopy: 'Thirteen years across Baidu, Meizu, Zhihu and Tencent—from consumer products to complex enterprise systems, SaaS and AI.',
    zhCopy: '13 年百度、魅族、知乎与腾讯经验，覆盖内容、会员与电商，也包括 SaaS、AI 与企业级复杂系统。',
    enTags: ['ToC & ToB', '0–1 products', 'Web, mobile & AI'],
    zhTags: ['ToC 与 ToB', '从 0 到 1', 'Web、移动端与 AI'],
  },
  {
    index: '03',
    en: 'Clear solutions',
    zh: '复杂问题清晰落地',
    enCopy: 'I turn ambiguous requirements and complex workflows into clear structures, intuitive experiences and actionable design systems.',
    zhCopy: '将模糊需求与复杂流程，转化为清晰的产品结构、易用的体验与能够真正落地的设计方案。',
    enTags: ['Problem framing', 'Systems thinking', 'Business outcomes'],
    zhTags: ['问题定义', '系统化思考', '业务结果导向'],
  },
];

export default function WorkPage() {
  const [lang, setLang] = useState<'zh' | 'en'>('en');
  useEffect(() => {
    let active = true;
    const reveal = () => {
      if (active) document.documentElement.classList.add('fonts-ready');
    };
    if ('fonts' in document) {
      Promise.all([
        document.fonts.load('200 82px "Google Sans"'),
        document.fonts.load('700 82px "Google Sans"'),
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
    const header = document.querySelector<HTMLElement>('.site-header');
    const headline = document.querySelector<HTMLElement>('.focus-stage');
    const cards = Array.from(document.querySelectorAll<HTMLElement>('.project-card'));
    const valueTitle = document.querySelector<HTMLElement>('.value-heading');
    const valueCards = Array.from(document.querySelectorAll<HTMLElement>('.value-card'));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let targetScroll = window.scrollY;
    let smoothScroll = targetScroll;
    let headlineStart = headline ? headline.getBoundingClientRect().top + targetScroll : 280;
    const updateParallax = () => {
      if (reduceMotion.matches) {
        frame = 0;
        return;
      }
      smoothScroll += (targetScroll - smoothScroll) * .11;
      const lag = targetScroll - smoothScroll;
      const heroShift = Math.max(-78, Math.min(78, lag * .38));
      const ambienceShift = Math.max(-24, Math.min(24, lag * .1));
      hero?.style.setProperty('--hero-shift', `${heroShift}px`);
      hero?.style.setProperty('--ambience-shift', `${ambienceShift}px`);
      if (header && window.innerWidth > 760) {
        const collapseDistance = Math.max(120, headlineStart - 100);
        const rawProgress = Math.max(0, Math.min(1, targetScroll / collapseDistance));
        const progress = rawProgress * rawProgress * (3 - 2 * rawProgress);
        header.style.setProperty('--header-progress', `${progress}`);
        header.dataset.scrolled = rawProgress > .025 ? 'true' : 'false';
      }
      const viewportCenter = window.innerHeight / 2;
      const strengths = [.022, .034, .026];
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const distance = rect.top + rect.height / 2 - viewportCenter;
        const shift = Math.max(-24, Math.min(24, -distance * strengths[index % strengths.length]));
        card.style.setProperty('--card-shift', `${shift}px`);
      });
      if (valueTitle) {
        const section = valueTitle.closest<HTMLElement>('.value-section');
        if (section) {
          const rect = section.getBoundingClientRect();
          const progress = Math.max(-1, Math.min(1, (window.innerHeight * .54 - rect.top - rect.height * .34) / window.innerHeight));
          valueTitle.style.setProperty('--value-title-shift', `${progress * 54}px`);
          valueCards.forEach((card, index) => {
            const depth = [22, 35, 27][index] ?? 24;
            card.style.setProperty('--value-card-shift', `${-progress * depth}px`);
          });
        }
      }
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
      if (headline && targetScroll === 0) headlineStart = headline.getBoundingClientRect().top;
      if (!frame) frame = window.requestAnimationFrame(updateParallax);
    };
    requestParallax();
    window.addEventListener('scroll', requestParallax, { passive: true });
    window.addEventListener('resize', requestParallax);
    return () => {
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
        <MeshBackground />
        <div className="hero-copy">
          <FocusHeadline words={zh ? ['化繁为简，','设计真正有效的产品。'] : ['Complexity made clear.','Products designed to grow.']} label={zh ? '化繁为简，设计真正有效的产品' : 'Complexity made clear. Products designed to grow'} href={zh ? '/work?lang=zh' : '/work'} emphasis={zh ? ['化繁为简', '有效', '产品'] : ['Complexity', 'clear', 'grow']} />
          <div className="intro-row">
            <img className="profile-avatar" src={`${basePath}/profile/shanyao-avatar.jpg`} width="58" height="58" alt={zh ? '山药的头像' : 'Portrait of Shanyao'} />
            <div className="hero-note"><p>{zh ? <><span>我是山药，一名拥有 13 年经验的独立产品设计师，曾就职于百度、魅族、知乎与腾讯。</span><span>我专注于将复杂想法转化为清晰、有效的数字产品。</span></> : <><span>I’m Shanyao, an independent product designer.</span><span>Across 13 years at Baidu, Meizu, Zhihu and Tencent, I’ve turned complex ideas into clear digital products that work.</span></>}</p></div>
          </div>
          <ContactPopover lang={lang} />
        </div>
      </section>
      <section className="value-section" aria-labelledby="value-title">
        <div className="value-heading">
          <p className="value-kicker">{zh ? '选择我，你将获得' : 'What you get'}</p>
          <h2 id="value-title">{zh ? <><span>资深判断，</span><span>亲自落地。</span></> : <><span>Senior thinking.</span><span>Hands-on craft.</span></>}</h2>
        </div>
        <div className="value-cards">
          {advantages.map((item) => (
            <article className="value-card" key={item.index}>
              <div className="value-card-top"><span>{item.index}</span><span aria-hidden="true">↗</span></div>
              <h3>{zh ? item.zh : item.en}</h3>
              <p>{zh ? item.zhCopy : item.enCopy}</p>
              <ul>{(zh ? item.zhTags : item.enTags).map((tag) => <li key={tag}>{tag}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>
      <section className="project-grid" aria-label="Selected projects">
        {projects.map((project) => (
          <article className="project-card" key={project.index}>
            <div className={`project-art art-${project.tone}`}>
              <span className="glass-orb orb-one" /><span className="glass-orb orb-two" />
              <span className="project-number">{project.index}</span><h2>{zh ? project.zh : project.en}</h2><span className="open-project" aria-hidden="true">↗</span>
            </div>
            <div className="project-caption"><strong>{zh ? project.zh : project.en}</strong><span>{zh ? project.zhType : project.enType}</span><span>{project.year}</span></div>
          </article>
        ))}
      </section>
      <section className="statement-card"><p className="kicker">{zh ? '设计方法' : 'Approach'}</p><h2>{zh ? <>清晰易用，<br />也令人难忘。</> : <>Clear enough to use.<br />Distinct enough to remember.</>}</h2><p className="statement-copy">{zh ? '从真实问题出发，将研究洞察、产品思维与视觉表达连接起来，形成清晰一致、可持续演进的产品体验。' : 'I work from the problem outward—connecting research, product thinking and crafted visual detail into one coherent experience.'}</p></section>
      <footer className="site-footer"><p>{zh ? '正在寻找设计伙伴或资深设计师？' : 'Have a role or project in mind?'}</p><a href="mailto:hello@example.com">{zh ? '聊一聊' : 'Let’s talk'} <span>↗</span></a><div><span>Shanyao — Designer</span><span>© 2026</span></div></footer>
    </main>
  );
}
