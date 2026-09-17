'use client';

import { useEffect, useState } from 'react';
import { SiteHeader } from '../site-header';

export default function ResumePage() {
  const [lang, setLang] = useState<'zh' | 'en'>('en');
  useEffect(() => {
    setLang(new URLSearchParams(window.location.search).get('lang') === 'zh' ? 'zh' : 'en');
  }, []);
  const zh = lang === 'zh';
  return (
    <main lang={zh ? 'zh-CN' : 'en'}>
      <SiteHeader active="resume" lang={lang} />
      <section className="resume-hero"><p className="kicker">{zh ? '个人简历 · 2026' : 'Resume · 2026'}</p><h1>Shanyao<br /><span>{zh ? '设计师' : 'Designer'}</span></h1><p className="resume-intro">{zh ? '以产品思维、交互设计与视觉表达，创造清晰、高效且有商业价值的数字体验。' : 'I design clear digital experiences at the intersection of product thinking, interaction and visual craft.'}</p></section>
      <section className="resume-sheet">
        <div className="resume-row resume-profile"><h2>{zh ? '简介' : 'Profile'}</h2><div><p>{zh ? '拥有 13 年互联网产品设计经验，曾服务于百度、魅族、知乎与腾讯，擅长将复杂业务与用户需求转化为直观、清晰且具有辨识度的产品体验。' : 'A product designer with 13 years of internet industry experience across Baidu, Meizu, Zhihu and Tencent, focused on turning complex business and user needs into intuitive, distinctive product experiences.'}</p></div></div>
        <div className="resume-row"><h2>{zh ? '工作经历' : 'Experience'}</h2><div className="empty-state"><strong>{zh ? '详细经历待补充' : 'Detailed experience to be added'}</strong><p>{zh ? '后续可补充任职时间、职位、职责与代表性成果。' : 'Add dates, roles, responsibilities and representative outcomes.'}</p></div></div>
        <div className="resume-row"><h2>{zh ? '专业能力' : 'Capabilities'}</h2><div className="skill-list"><span>{zh?'产品设计':'Product design'}</span><span>{zh?'用户研究':'UX research'}</span><span>{zh?'交互设计':'Interaction design'}</span><span>{zh?'视觉系统':'Visual systems'}</span><span>{zh?'原型设计':'Prototyping'}</span><span>{zh?'设计管理':'Design direction'}</span></div></div>
        <div className="resume-row"><h2>{zh ? '获奖经历' : 'Awards'}</h2><div className="empty-state"><strong>{zh ? '获奖信息待补充' : 'Award details to be added'}</strong><p>{zh ? '后续可补充奖项名称、获奖项目、级别与年份。' : 'Add award, awarded project, distinction and year.'}</p></div></div>
        <div className="resume-row"><h2>{zh ? '设计专利' : 'Patents'}</h2><div className="empty-state"><strong>{zh ? '专利信息待补充' : 'Patent details to be added'}</strong><p>{zh ? '后续可补充专利名称、类型、专利号与授权年份。' : 'Add patent title, type, registration number and year granted.'}</p></div></div>
        <div className="resume-row"><h2>{zh ? '教育经历' : 'Education'}</h2><div className="empty-state"><strong>{zh ? '教育信息待补充' : 'Education details to be added'}</strong><p>{zh ? '后续可补充院校、专业与毕业年份。' : 'Add school, subject and graduation year.'}</p></div></div>
        <div className="resume-row"><h2>{zh ? '联系方式' : 'Contact'}</h2><div className="contact-list"><a href="mailto:hello@example.com">{zh?'邮箱':'Email'} ↗</a><span>{zh?'中国 · 上海':'Shanghai, China'}</span><span>{zh?'期待新的机会':'Available for opportunities'}</span></div></div>
      </section>
      <footer className="resume-footer"><span>Shanyao — Designer</span><span>{zh?'简历':'Resume'} / 2026</span></footer>
    </main>
  );
}
