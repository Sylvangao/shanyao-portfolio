'use client';
import { useEffect, useState } from 'react';
import { SiteHeader } from '../site-header';
import { ContactPopover } from '../contact-popover';
import { SiteFooter } from '../site-footer';
const experience = [
 {logo:'tencent',company:['Tencent','腾讯'],date:'2023.05 — 2026.09',role:['Product Design Expert · CSIG','产品设计专家 · CSIG'],team:['Enterprise Platform / Tencent Lexiang','企业中台产品部 / 乐享产品中心'],copy:['Designed the initial AI framework for Tencent Lexiang and its 2.0 redesign. Led zero-to-one design for Yunji, an internally incubated knowledge and collaboration product, alongside product and operational design for Tencent Yunzhi.','负责腾讯乐享 AI 一期体验框架与乐享 2.0 整体改版，推动内部孵化的云迹知识与协作产品从零到一落地，并参与腾讯云知的产品体验与运营设计建设。'],points:[['Built foundational AI assistant capabilities and pricing experiences.','搭建 AI 助手核心使用体验，贯通能力入口、任务流程与产品定价。'],['Developed knowledge-base workflows later incorporated into Lexiang 2.0.','建立知识库核心交互与协作流程，相关能力后续整合至乐享 2.0。'],['Recognized as an outstanding employee in 2023, with an S performance rating.','2023 年优秀员工，年度绩效 S。']]},
 {logo:'zhihu',company:['Zhihu','知乎'],date:'2016.06 — 2023.05',role:['Senior Product Design Manager · L1–2','高级产品设计经理 · L1–2'],team:['Education & Membership / User Experience Center','教育会员事业部 / 用户体验中心'],copy:['Built and led a product design team of 10–13 designers, establishing workflows and design standards. Led end-to-end design across paid membership, education, content consumption and creator tools.','从零组建并管理 10–13 人产品设计团队，建立协作流程与设计标准。统筹会员、教育、内容消费及创作者工具的全链路体验，推动跨业务场景的一致性与设计质量。'],points:[['Led major cross-team initiatives including Zhihu 7.0 and the emotional design program for Zhihu 8.0.','推动知乎 7.0 改版与知乎 8.0 情感化设计，协调跨团队资源，将体验策略落实到关键场景。'],['Designed Yan Stories, Zhihu Classroom and civil-service AI courses from zero to launch. Yan Stories received an App Store reading recommendation.','推动盐言故事、知乎学堂、公考 AI 课从零到一上线；盐言故事获 App Store 阅读类推荐。'],['Worked on membership experiences as the effective membership base passed 15 million in 2023.','持续设计会员体验，2023 年业务有效会员数突破 1500 万。'],['Previously led a four-person commercial design team, advertising platforms and Zhihu Bookstore; contributed to PC 2.0 and its design system.','此前带领 4 人商业设计团队，负责广告平台与知乎书店体验，并参与知乎 PC 2.0 及设计系统建设。']]},
 {logo:'meizu',company:['Meizu · Flyme','魅族 · Flyme'],date:'2014.11 — 2016.06',role:['Senior UI Designer','高级 UI 设计师'],team:['Flyme Design Center','Flyme 设计中心'],copy:['Designed core Flyme 5.0 tools including Weather, Notes and Maps. Led a four-person team for incubated apps and worked on LifeKit and Dayu, including their brand identities.','负责 Flyme 5.0 天气、便签、地图等核心工具的体验设计，带领 4 人团队推进内部孵化应用，统筹 LifeKit 与大鱼的产品界面及品牌表达。'],points:[['LifeKit connected more than ten smart hardware products; Dayu reached 300,000 monthly active users.','LifeKit 接入十余款智能硬件；大鱼稳定达到 30 万月活。']]},
 {logo:'baidu',company:['Baidu · Dianxin Mobile','百度 · 点心移动'],date:'2013.11 — 2014.11',role:['UI Designer','UI 设计师'],team:['Baidu Mobile Guardian','百度手机卫士产品组'],copy:['Designed core mobile security experiences including the home screen, one-tap optimization, acceleration and cleanup, and contributed to the product’s brand redesign.','负责百度手机卫士首页、一键优化、手机加速及垃圾清理等高频场景的体验设计，并参与产品品牌升级，强化核心功能的易用性与视觉一致性。'],points:[['Recognized as an outstanding individual in 2014.','获 2014 年公司年度优秀个人。']]},
 {logo:'blue-eagle',company:['Blue Eagle Design','西安蓝鹰设计'],date:'2013.03 — 2013.11',role:['UI Designer','UI 设计师'],team:['Mobile product design','移动产品设计'],copy:['Designed interfaces for a range of mobile products.','参与多款移动产品的界面设计，将产品需求转化为清晰的页面结构与视觉方案。'],points:[]},
];
const companyContext: Record<string,string[]> = {
 tencent:['Enterprise software for knowledge sharing, collaboration and AI-assisted work.','面向企业的知识管理与协作产品，结合 AI 能力提升组织效率。'],
 zhihu:['A knowledge and content community, spanning membership, education and creator tools.','知识与内容社区，业务涵盖付费会员、在线教育及创作者工具。'],
 meizu:['Flyme brings together mobile system experiences, everyday apps and connected devices.','Flyme 围绕移动操作系统、日常工具与智能设备，构建完整的用户体验。'],
 baidu:['Mobile security tools focused on device performance, optimisation and cleanup.','移动安全工具，围绕手机性能、一键优化与清理提供核心服务。'],
 'blue-eagle':['A design studio working on interfaces for mobile products.','为移动产品提供界面设计的设计团队。'],
};
const awards = [
 ['Tencent','腾讯',[
 ['2024','Invited design talk on Yunji at CSIG Enterprise Platform','受邀进行 CSIG 企业中台云迹设计分享'],
 ['2023','Tencent Xi’an H2 Outstanding Employee · S performance','腾讯（西安）H2 优秀员工 · S 绩效']]],
 ['Zhihu','知乎',[
 ['2022','Invited talk at Baidu: Content Business Product Design at Zhihu','受邀百度交流《知乎内容商业产品设计》'],
 ['2021','Annual Excellence in Service Award','知乎年度极致服务奖'],
 ['2020','Annual Outstanding Team Award','知乎年度优秀团队奖'],
 ['2020','Cultural Representative Award','知乎个人文化之星'],
 ['2019','Polaris Award · Community Integration Project','知乎北极星奖 · 社区融合项目'],
 ['2018','China Red Star Design Original Award · Zhihu University','中国设计红星原创奖 · 知乎大学全流程设计'],
 ['2017','Outstanding Individual in Team · Two S performance ratings','知乎年度团队优秀个人 · 双 S 绩效'],
 ['2016–2017','6 design patents successfully filed','成功申请 6 项设计专利（知乎）']]],
 ['Meizu','魅族',[['2015–2016','20 design patents successfully filed','成功申请 20 项设计专利（魅族）']]],
 ['Baidu','百度',[['2014','Dianxin Mobile Annual Outstanding Individual','百度（点心移动）年度优秀个人']]],
] as const;
export default function ResumePage(){
 const [lang,setLang]=useState<'en'|'zh'>('en');
 useEffect(()=>setLang(new URLSearchParams(window.location.search).get('lang')==='zh'?'zh':'en'),[]);
 const zh=lang==='zh', n=zh?1:0, base=process.env.NEXT_PUBLIC_BASE_PATH??'';
 return <main className="resume-page" lang={zh?'zh-CN':'en'}>
  <SiteHeader active="resume" lang={lang}/>
  <div className="resume-layout">
   <aside className="resume-photo"><img src={`${base}/profile/shanyao-portrait-optimized.jpg`} alt={zh?'山药的照片':'Portrait of Shanyao'} width="1620" height="1080"/><div><span>SHANYAO GAO</span><span>{zh?'设计 · 思考 · 探索':'Design · Think · Explore'}</span></div></aside>
   <div className="resume-body">
    <section className="resume-about"><p className="resume-eyebrow">{zh?'关于我':'ABOUT ME'}</p><h1>{zh?'你好，我是山药。':'Hi, I’m Shanyao.'}</h1><p className="resume-role">{zh?'独立产品设计师 / 产品设计与团队管理':'Independent product designer / Design & leadership'}</p>
     <p>{zh?'我是一名拥有 13 年互联网产品设计经验的独立产品设计师，曾在腾讯、知乎、魅族与百度参与核心产品建设。横跨消费产品与企业服务，我擅长梳理复杂业务，将用户需求与商业目标转化为清晰、可落地的产品体验。':'I’m a product designer with 13 years of experience across Tencent, Zhihu, Meizu and Baidu. Working across consumer products and enterprise services, I turn complex business logic into clear, effective experiences.'}</p>
     <p>{zh?'我的设计实践覆盖用户研究、交互与视觉设计、品牌建设及设计系统。凭借 5 年团队管理经验，我不仅推动产品从零到一，也通过团队建设、流程与标准沉淀，让设计质量与协作效率持续提升。':'My practice spans user research, interaction and visual design, and brand identity. With five years of team management experience, I build products and design teams from the ground up, using research and data to inform decisions.'}</p>
     <p>{zh?'我以系统性思考拆解问题，以用户研究与数据支持判断，并与产品、研发和业务团队紧密协作。从产品方向到关键细节，我关注设计如何降低使用门槛、建立一致体验，并为业务创造长期价值。':'I enjoy breaking down problems and making systems understandable. I work closely with product and engineering, connecting business goals with the details that make an experience useful and coherent.'}</p>
     <ContactPopover lang={lang} variant="resume" />
    </section>
    <section className="resume-history"><h2>{zh?'工作经历':'Experience'}</h2>{experience.map(e=><article className="resume-job" key={e.company[0]}><div className="resume-entry-header"><span className={`resume-org-mark resume-brand-mark resume-brand-${e.logo}`}><img className="resume-org-logo" src={`${base}/logos/${e.logo}.${['tencent','zhihu','meizu','baidu','blue-eagle'].includes(e.logo) ? 'svg' : 'png'}`} alt={e.company[n]} /></span><div className="resume-entry-info"><h4>{e.role[n]}</h4><p className="resume-team">{e.team[n]}</p></div><span className="resume-entry-date">{e.date}</span></div><div className="resume-company-context"><p>{companyContext[e.logo][n]}</p></div><p>{e.copy[n]}</p>{e.points.length>0&&<ul>{e.points.map(p=><li key={p[0]}>{p[n]}</li>)}</ul>}</article>)}</section>
    <section className="resume-education"><h2>{zh?'教育经历':'Education'}</h2><div className="resume-entry-header"><span className="resume-org-mark resume-school-mark"><img className="resume-org-logo resume-school-logo" src={`${base}/logos/nwpu-large.png`} alt="" aria-hidden="true" /></span><div className="resume-entry-info"><h3>{zh?'西北工业大学':'Northwestern Polytechnical University'}</h3><p className="resume-team">{zh?'通信工程 · 学士学位':'B.Eng. in Communication Engineering'}</p></div><span className="resume-entry-date">2009.09 — 2013.06</span></div></section>
    <section className="resume-awards"><h2>{zh?'获奖与分享':'Awards & sharing'}</h2><figure className="resume-awards-gallery"><img src={`${base}/profile/awards-collage-optimized.png`} alt={zh?'设计分享、奖项与团队荣誉照片合集':'Design talks, awards and team recognition'} width="1735" height="919" loading="lazy"/><figcaption>{zh?'设计分享、团队荣誉与个人认可':'Design talks, team achievements and personal recognition'}</figcaption></figure>{awards.map(group=><div className="resume-award-group" key={group[0]}><h3>{group[n]}</h3><ul>{group[2].map(a=><li key={a[0]+a[1]}><span className="resume-award-year">{a[0]}</span><span>{a[zh?2:1]}</span></li>)}</ul></div>)}</section>
   </div>
  </div>
  <SiteFooter lang={lang}/>
 </main>;
}
