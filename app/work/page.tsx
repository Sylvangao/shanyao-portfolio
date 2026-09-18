'use client';

import { useEffect, useRef, useState } from 'react';
import { LiquidGlass, type LiquidGlassHandle } from 'liquid-glass-web-react';
import { SiteHeader } from '../site-header';
import { FocusHeadline } from '../focus-headline';
import { MeshBackground } from '../mesh-background';
import { ContactPopover } from '../contact-popover';

const projects = [
  { index:'01', en:'Product experience', zh:'产品体验设计', enType:'Product design', zhType:'产品设计', year:'2026', tone:'blue' },
  { index:'02', en:'A new identity', zh:'品牌焕新', enType:'Brand system', zhType:'品牌系统', year:'2026', tone:'silver' },
  { index:'03', en:'Digital service', zh:'数字化服务', enType:'UX / Interface', zhType:'体验 / 界面', year:'2025', tone:'green' },
];

export default function WorkPage() {
  const [lang, setLang] = useState<'zh' | 'en'>('en');
  const glassCursor = useRef<LiquidGlassHandle>(null);
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
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let targetScroll = window.scrollY;
    let smoothScroll = targetScroll;
    let headlineStart = headline ? headline.getBoundingClientRect().top + targetScroll : 280;
    let lastPointer = { x: -100, y: -100 };
    let hoveringControl = false;

    const positionGlass = () => {
      const element = glassCursor.current?.element;
      if (!element || lastPointer.x < 0) return;
      const rect = element.getBoundingClientRect();
      glassCursor.current?.setPosition(
        (lastPointer.x - rect.left) / rect.width,
        (lastPointer.y - rect.top) / rect.height,
      );
    };

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
        const openWidth = window.innerWidth - 40;
        const closedWidth = Math.min(1180, openWidth);
        header.style.setProperty('--header-progress', `${progress}`);
        header.style.setProperty('--header-width', `${openWidth + (closedWidth - openWidth) * progress}px`);
        header.style.setProperty('--header-height', `${72 - 14 * progress}px`);
      }
      const viewportCenter = window.innerHeight / 2;
      const strengths = [.022, .034, .026];
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const distance = rect.top + rect.height / 2 - viewportCenter;
        const shift = Math.max(-24, Math.min(24, -distance * strengths[index % strengths.length]));
        card.style.setProperty('--card-shift', `${shift}px`);
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
      if (headline && targetScroll === 0) headlineStart = headline.getBoundingClientRect().top;
      positionGlass();
      if (!frame) frame = window.requestAnimationFrame(updateParallax);
    };
    const moveCursor = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      lastPointer = { x: event.clientX, y: event.clientY };
      positionGlass();
      const nextHovering = Boolean((event.target as Element)?.closest('a,button,[role="button"]'));
      if (nextHovering !== hoveringControl) {
        hoveringControl = nextHovering;
        glassCursor.current?.engine?.setOptions({ width: nextHovering ? 56 : 44, height: nextHovering ? 56 : 44 });
      }
    };
    const hideCursor = () => {
      lastPointer = { x: -100, y: -100 };
      glassCursor.current?.setPosition(-1, -1);
    };
    const pressCursor = () => glassCursor.current?.engine?.setOptions({ width: 38, height: 38 });
    const releaseCursor = () => glassCursor.current?.engine?.setOptions({ width: hoveringControl ? 56 : 44, height: hoveringControl ? 56 : 44 });

    document.documentElement.classList.add('has-custom-cursor');
    requestParallax();
    window.addEventListener('scroll', requestParallax, { passive: true });
    window.addEventListener('resize', requestParallax);
    window.addEventListener('pointermove', moveCursor, { passive: true });
    document.documentElement.addEventListener('mouseleave', hideCursor);
    window.addEventListener('pointerdown', pressCursor, { passive: true });
    window.addEventListener('pointerup', releaseCursor, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('scroll', requestParallax);
      window.removeEventListener('resize', requestParallax);
      window.removeEventListener('pointermove', moveCursor);
      document.documentElement.removeEventListener('mouseleave', hideCursor);
      window.removeEventListener('pointerdown', pressCursor);
      window.removeEventListener('pointerup', releaseCursor);
    };
  }, []);
  const zh = lang === 'zh';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  return (
    <LiquidGlass
      ref={glassCursor}
      className="liquid-page"
      x={-1}
      y={-1}
      width={44}
      height={44}
      radius="auto"
      strength={.1}
      chromaticAberration={.22}
      blur={.2}
      depth={10}
      curvature={.88}
      glow={.14}
      edgeHighlight={.4}
      specular={1.05}
      quality={128}
      shadow="0 8px 22px rgba(31,38,55,.12), inset 0 1px 1px rgba(255,255,255,.82)"
    >
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
    </LiquidGlass>
  );
}
