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

export default function WorkPage() {
  const [lang, setLang] = useState<'zh' | 'en'>('en');
  useEffect(() => {
    setLang(new URLSearchParams(window.location.search).get('lang') === 'zh' ? 'zh' : 'en');
  }, []);
  const zh = lang === 'zh';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  return (
    <main lang={lang === 'zh' ? 'zh-CN' : 'en'}>
      <SiteHeader active="work" lang={lang} />
      <section className="work-hero">
        <MeshBackground />
        <div className="hero-copy">
          <FocusHeadline words={zh ? ['化繁为简，','设计真正有效的产品。'] : ['Complexity made clear.','Products designed to grow.']} label={zh ? '化繁为简，设计真正有效的产品' : 'Complexity made clear. Products designed to grow'} href={zh ? '/work?lang=zh' : '/work'} />
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
  );
}
