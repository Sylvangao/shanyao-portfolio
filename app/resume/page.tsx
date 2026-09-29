'use client';

import { useEffect, useState } from 'react';
import { SiteHeader } from '../site-header';

const companies = ['Baidu', 'Meizu', 'Zhihu', 'Tencent'];
const principles = [
  { index: '01', en: 'Find the signal', zh: '找到关键信号', enCopy: 'Turn ambiguity, competing inputs and complex workflows into a problem the team can act on.', zhCopy: '从模糊信息、不同诉求与复杂流程中找到真正的问题，让团队能够清晰行动。' },
  { index: '02', en: 'Shape the system', zh: '建立产品系统', enCopy: 'Connect product logic, interaction and visual language so the experience works as one coherent system.', zhCopy: '连接产品逻辑、交互与视觉语言，让体验成为一个连贯且可持续的系统。' },
  { index: '03', en: 'Make it real', zh: '推动真实落地', enCopy: 'Work closely with product and engineering, staying involved from early direction to the final detail.', zhCopy: '与产品和研发紧密协作，从早期方向到最终细节持续参与，推动设计真正落地。' },
];
const capabilities = [
  ['Product strategy', '产品策略'], ['Experience design', '体验设计'], ['Complex systems', '复杂系统'], ['Interaction design', '交互设计'],
  ['Visual direction', '视觉方向'], ['Prototyping', '原型设计'], ['Design systems', '设计系统'], ['AI products', 'AI 产品'],
];

export default function ResumePage() {
  const [lang, setLang] = useState<'zh' | 'en'>('en');
  useEffect(() => setLang(new URLSearchParams(window.location.search).get('lang') === 'zh' ? 'zh' : 'en'), []);
  const zh = lang === 'zh';
  return (
    <main className="resume-page" lang={zh ? 'zh-CN' : 'en'}>
      <SiteHeader active="resume" lang={lang} />
      <section className="resume-editorial-hero">
        <div className="resume-hero-meta"><span>{zh ? '独立产品设计师' : 'Independent product designer'}</span><span>{zh ? '中国 · 上海' : 'Shanghai · China'}</span></div>
        <h1><span>{zh ? '让复杂' : 'Designing clarity'}</span><span className="resume-hero-outline">{zh ? '变得清晰。' : 'into complexity.'}</span></h1>
        <div className="resume-hero-intro">
          <img src="/shanyao-portfolio/profile/shanyao-avatar.jpg" alt={zh ? '山药头像' : 'Portrait of Shanyao'} />
          <p>{zh ? '我是山药，一名拥有 13 年互联网经验的产品设计师。我在消费产品、复杂系统、SaaS 与 AI 之间工作，将业务目标和用户需求转化为清晰、可靠且具有辨识度的数字体验。' : 'I’m Shanyao, a product designer with 13 years of internet industry experience. I work across consumer products, complex systems, SaaS and AI—turning business goals and user needs into clear, reliable and distinctive digital experiences.'}</p>
        </div>
      </section>
      <section className="resume-snapshot" aria-label={zh ? '经验概览' : 'Experience snapshot'}>
        <div><strong>13</strong><span>{zh ? '年产品设计经验' : 'Years in product design'}</span></div>
        <div><strong>04</strong><span>{zh ? '段互联网公司经历' : 'Internet companies'}</span></div>
        <div><strong>01</strong><span>{zh ? '位全程负责的设计伙伴' : 'Accountable design partner'}</span></div>
      </section>
      <section className="resume-section resume-career">
        <div className="resume-section-heading"><span>01</span><h2>{zh ? '经验所至' : 'Where I’ve worked'}</h2></div>
        <div className="resume-company-list">{companies.map((company, index) => <div className="resume-company" key={company}><span>{String(index + 1).padStart(2, '0')}</span><strong>{company}</strong><small>{zh ? '产品与体验设计' : 'Product & experience design'}</small></div>)}</div>
        <p className="resume-career-note">{zh ? '从大型平台到快速变化的产品团队，这些经历塑造了我在规模、协作与落地之间做判断的方式。具体职位、时间与项目成果将在完整履历确认后补充。' : 'From large platforms to fast-moving product teams, these experiences shaped how I make decisions across scale, collaboration and delivery. Roles, dates and project outcomes will be added after the full résumé is confirmed.'}</p>
      </section>
      <section className="resume-section resume-method">
        <div className="resume-section-heading"><span>02</span><h2>{zh ? '我如何工作' : 'How I work'}</h2></div>
        <div className="resume-principles">{principles.map((principle) => <article key={principle.index}><span>{principle.index}</span><h3>{zh ? principle.zh : principle.en}</h3><p>{zh ? principle.zhCopy : principle.enCopy}</p></article>)}</div>
      </section>
      <section className="resume-section resume-capabilities">
        <div className="resume-section-heading"><span>03</span><h2>{zh ? '核心能力' : 'Capabilities'}</h2></div>
        <div className="resume-capability-cloud">{capabilities.map(([en, cn]) => <span key={en}>{zh ? cn : en}</span>)}</div>
      </section>
      <section className="resume-contact-panel">
        <p>{zh ? '有复杂的问题需要一起梳理？' : 'Have a complex product to make clear?'}</p><h2>{zh ? '聊聊你的项目。' : 'Let’s talk.'}</h2>
        <div><a href="mailto:nealgao@163.com">nealgao@163.com</a><a href="tel:+8615319925652">+86 153 1992 5652</a></div>
      </section>
      <footer className="resume-footer"><div><small>COPYRIGHT</small><span>© 2026 Shanyao Gao.</span></div><div><small>LEGAL</small><span>All rights reserved.</span></div></footer>
    </main>
  );
}
