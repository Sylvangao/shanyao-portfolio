'use client';
import { useEffect, useState } from 'react';
import { SiteHeader } from '../site-header';
import { ContactPopover } from '../contact-popover';
import { SiteFooter } from '../site-footer';
const experience = [
 {logo:'tencent',company:['Tencent','腾讯'],date:'2023.05 — 2026.09',role:['Senior Visual Designer · CSIG','高级视觉设计师 · CSIG'],team:['Enterprise Platform / Tencent Lexiang','企业中台产品部 / 乐享产品中心'],copy:['Designed the initial AI framework for Tencent Lexiang and its 2.0 redesign. Led zero-to-one design for Yunji, an internally incubated knowledge and collaboration product, alongside product and operational design for Tencent Yunzhi.','负责腾讯乐享 AI 一期框架及乐享 2.0 改版，推动云迹知识库与协作产品从零到一，并参与腾讯云知产品与运营设计管理。'],points:[['Built foundational AI assistant capabilities and pricing experiences.','完成 AI 助手初步能力建设与定价设计。'],['Developed knowledge-base workflows later incorporated into Lexiang 2.0.','搭建知识库核心体验，后续融入乐享 2.0 持续迭代。'],['Recognized as an outstanding employee in 2023, with an S performance rating.','2023 年优秀员工，年度绩效 S。']]},
 {logo:'zhihu',company:['Zhihu','知乎'],date:'2016.06 — 2023.05',role:['Senior Product Design Manager · L1–2','高级产品设计经理 · L1–2'],team:['Education & Membership / User Experience Center','教育会员事业部 / 用户体验中心'],copy:['Built and led a product design team of 10–13 designers, establishing workflows and design standards. Led end-to-end design across paid membership, education, content consumption and creator tools.','从零搭建并管理 10–13 人产品设计团队，建立设计流程与标准，负责会员、教育、内容消费及创作者工具的全链路体验。'],points:[['Led major cross-team initiatives including Zhihu 7.0 and the emotional design program for Zhihu 8.0.','推动知乎 7.0 改版与知乎 8.0 情感化设计等跨团队项目。'],['Designed Yan Stories, Zhihu Classroom and civil-service AI courses from zero to launch. Yan Stories received an App Store reading recommendation.','推动盐言故事、知乎学堂、公考 AI 课从零到一上线；盐言故事获 App Store 阅读类推荐。'],['Worked on membership experiences as the effective membership base passed 15 million in 2023.','持续设计会员体验，2023 年业务有效会员数突破 1500 万。'],['Previously led a four-person commercial design team, advertising platforms and Zhihu Bookstore; contributed to PC 2.0 and its design system.','此前管理 4 人商业设计团队，负责广告平台、知乎书店，并参与 PC 2.0 与设计系统建设。']]},
 {logo:'meizu',company:['Meizu · Flyme','魅族 · Flyme'],date:'2014.11 — 2016.06',role:['Senior UI Designer','高级 UI 设计师'],team:['Flyme Design Center','Flyme 设计中心'],copy:['Designed core Flyme 5.0 tools including Weather, Notes and Maps. Led a four-person team for incubated apps and worked on LifeKit and Dayu, including their brand identities.','负责 Flyme 5.0 天气、便签、地图等核心工具设计，管理 4 人内部孵化 App 设计团队，参与 LifeKit 与大鱼产品及品牌设计。'],points:[['LifeKit connected more than ten smart hardware products; Dayu reached 300,000 monthly active users.','LifeKit 接入十余款智能硬件；大鱼稳定达到 30 万月活。']]},
 {logo:'baidu',company:['Baidu · Dianxin Mobile','百度 · 点心移动'],date:'2013.11 — 2014.11',role:['UI Designer','UI 设计师'],team:['Baidu Mobile Guardian','百度手机卫士产品组'],copy:['Designed core mobile security experiences including the home screen, one-tap optimization, acceleration and cleanup, and contributed to the product’s brand redesign.','负责百度手机卫士首页、一键优化、手机加速与垃圾清理等核心体验，以及产品品牌变更设计。'],points:[['Recognized as an outstanding individual in 2014.','获 2014 年公司年度优秀个人。']]},
 {logo:'blue-eagle',company:['Blue Eagle Design','西安蓝鹰设计'],date:'2013.03 — 2013.11',role:['UI Designer','UI 设计师'],team:['Mobile product design','移动产品设计'],copy:['Designed interfaces for a range of mobile products.','负责多款移动端产品的 UI 设计。'],points:[]},
];
export default function ResumePage(){
 const [lang,setLang]=useState<'en'|'zh'>('en');
 useEffect(()=>setLang(new URLSearchParams(window.location.search).get('lang')==='zh'?'zh':'en'),[]);
 const zh=lang==='zh', n=zh?1:0, base=process.env.NEXT_PUBLIC_BASE_PATH??'';
 return <main className="resume-page" lang={zh?'zh-CN':'en'}>
  <SiteHeader active="resume" lang={lang}/>
  <div className="resume-layout">
   <aside className="resume-photo"><img src={`${base}/profile/shanyao-portrait.jpg`} alt={zh?'山药的照片':'Portrait of Shanyao'} width="1620" height="1080"/><div><span>SHANYAO GAO</span><span>{zh?'设计 · 思考 · 探索':'Design · Think · Explore'}</span></div></aside>
   <div className="resume-body">
    <section className="resume-about"><p className="resume-eyebrow">{zh?'关于我':'ABOUT ME'}</p><h1>{zh?'你好，我是山药。':'Hi, I’m Shanyao.'}</h1><p className="resume-role">{zh?'独立产品设计师 / 产品设计与团队管理':'Independent product designer / Design & leadership'}</p>
     <p>{zh?'我是一名拥有 13 年互联网产品设计经验的设计师，曾就职于腾讯、知乎、魅族和百度。在消费产品与企业服务之间，我将复杂的业务逻辑转化为清晰、有效的体验。':'I’m a product designer with 13 years of experience across Tencent, Zhihu, Meizu and Baidu. Working across consumer products and enterprise services, I turn complex business logic into clear, effective experiences.'}</p>
     <p>{zh?'我的工作涵盖用户研究、交互与视觉设计，以及品牌建设。拥有 5 年团队管理经验，擅长从零到一搭建产品与设计团队，并基于用户调研和数据分析推动设计决策。':'My practice spans user research, interaction and visual design, and brand identity. With five years of team management experience, I build products and design teams from the ground up, using research and data to inform decisions.'}</p>
     <p>{zh?'我喜欢拆解问题、梳理系统，也乐于跨越角色边界，与产品和研发一起把想法落地。从业务目标到最终细节，我关注设计如何为用户和团队持续创造价值。':'I enjoy breaking down problems and making systems understandable. I work closely with product and engineering, connecting business goals with the details that make an experience useful and coherent.'}</p>
     <ContactPopover lang={lang} variant="resume" />
    </section>
    <section className="resume-history"><h2>{zh?'工作经历':'Experience'}</h2>{experience.map(e=><article className="resume-job" key={e.company[0]}><div className="resume-entry-header"><span className={`resume-org-mark resume-brand-mark resume-brand-${e.logo}`}><img className="resume-org-logo" src={`${base}/logos/${e.logo}.${['tencent','zhihu','blue-eagle'].includes(e.logo) ? 'svg' : 'png'}`} alt={e.company[n]} /></span><div className="resume-entry-info"><h4>{e.role[n]}</h4><p className="resume-team">{e.team[n]}</p></div><span className="resume-entry-date">{e.date}</span></div><p>{e.copy[n]}</p>{e.points.length>0&&<ul>{e.points.map(p=><li key={p[0]}>{p[n]}</li>)}</ul>}</article>)}</section>
    <section className="resume-education"><h2>{zh?'教育经历':'Education'}</h2><div className="resume-entry-header"><span className="resume-org-mark"><img className="resume-org-logo resume-school-logo" src={`${base}/logos/nwpu.png`} alt="" aria-hidden="true" /></span><div className="resume-entry-info"><h3>{zh?'西北工业大学':'Northwestern Polytechnical University'}</h3><p className="resume-team">{zh?'通信工程 · 学士学位':'B.Eng. in Communication Engineering'}</p></div><span className="resume-entry-date">2009.09 — 2013.06</span></div></section>
   </div>
  </div>
  <SiteFooter lang={lang}/>
 </main>;
}
