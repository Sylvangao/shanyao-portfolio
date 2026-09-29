window.addEventListener('load', () => {
  const main = document.querySelector('main');
  if (!main) return;
  const zh = new URLSearchParams(location.search).get('lang') === 'zh';
  const copy = zh ? {
    role:'独立产品设计师',place:'中国 · 上海',line1:'让复杂',line2:'变得清晰。',intro:'我是山药，一名拥有 13 年互联网经验的产品设计师。我在消费产品、复杂系统、SaaS 与 AI 之间工作，将业务目标和用户需求转化为清晰、可靠且具有辨识度的数字体验。',
    years:'年产品设计经验',companies:'段互联网公司经历',partner:'位全程负责的设计伙伴',worked:'经验所至',discipline:'产品与体验设计',career:'从大型平台到快速变化的产品团队，这些经历塑造了我在规模、协作与落地之间做判断的方式。具体职位、时间与项目成果将在完整履历确认后补充。',how:'我如何工作',caps:'核心能力',question:'有复杂的问题需要一起梳理？',talk:'聊聊你的项目。'
  } : {
    role:'Independent product designer',place:'Shanghai · China',line1:'Designing clarity',line2:'into complexity.',intro:'I’m Shanyao, a product designer with 13 years of internet industry experience. I work across consumer products, complex systems, SaaS and AI—turning business goals and user needs into clear, reliable and distinctive digital experiences.',
    years:'Years in product design',companies:'Internet companies',partner:'Accountable design partner',worked:'Where I’ve worked',discipline:'Product & experience design',career:'From large platforms to fast-moving product teams, these experiences shaped how I make decisions across scale, collaboration and delivery. Roles, dates and project outcomes will be added after the full résumé is confirmed.',how:'How I work',caps:'Capabilities',question:'Have a complex product to make clear?',talk:'Let’s talk.'
  };
  const principles = zh ? [['找到关键信号','从模糊信息、不同诉求与复杂流程中找到真正的问题，让团队能够清晰行动。'],['建立产品系统','连接产品逻辑、交互与视觉语言，让体验成为一个连贯且可持续的系统。'],['推动真实落地','与产品和研发紧密协作，从早期方向到最终细节持续参与，推动设计真正落地。']] : [['Find the signal','Turn ambiguity, competing inputs and complex workflows into a problem the team can act on.'],['Shape the system','Connect product logic, interaction and visual language so the experience works as one coherent system.'],['Make it real','Work closely with product and engineering, staying involved from early direction to the final detail.']];
  const capabilities = zh ? ['产品策略','体验设计','复杂系统','交互设计','视觉方向','原型设计','设计系统','AI 产品'] : ['Product strategy','Experience design','Complex systems','Interaction design','Visual direction','Prototyping','Design systems','AI products'];
  const header = main.querySelector('.site-header');
  main.className = 'resume-page'; main.lang = zh ? 'zh-CN' : 'en'; main.innerHTML = '';
  if (header) main.append(header);
  main.insertAdjacentHTML('beforeend', `
    <section class="resume-editorial-hero"><div class="resume-hero-meta"><span>${copy.role}</span><span>${copy.place}</span></div><h1><span>${copy.line1}</span><span class="resume-hero-outline">${copy.line2}</span></h1><div class="resume-hero-intro"><img src="/shanyao-portfolio/profile/shanyao-avatar.jpg" alt="Shanyao"><p>${copy.intro}</p></div></section>
    <section class="resume-snapshot"><div><strong>13</strong><span>${copy.years}</span></div><div><strong>04</strong><span>${copy.companies}</span></div><div><strong>01</strong><span>${copy.partner}</span></div></section>
    <section class="resume-section resume-career"><div class="resume-section-heading"><span>01</span><h2>${copy.worked}</h2></div><div class="resume-company-list">${['Baidu','Meizu','Zhihu','Tencent'].map((company,i)=>`<div class="resume-company"><span>0${i+1}</span><strong>${company}</strong><small>${copy.discipline}</small></div>`).join('')}</div><p class="resume-career-note">${copy.career}</p></section>
    <section class="resume-section resume-method"><div class="resume-section-heading"><span>02</span><h2>${copy.how}</h2></div><div class="resume-principles">${principles.map((item,i)=>`<article><span>0${i+1}</span><h3>${item[0]}</h3><p>${item[1]}</p></article>`).join('')}</div></section>
    <section class="resume-section resume-capabilities"><div class="resume-section-heading"><span>03</span><h2>${copy.caps}</h2></div><div class="resume-capability-cloud">${capabilities.map(item=>`<span>${item}</span>`).join('')}</div></section>
    <section class="resume-contact-panel"><p>${copy.question}</p><h2>${copy.talk}</h2><div><a href="mailto:nealgao@163.com">nealgao@163.com</a><a href="tel:+8615319925652">+86 153 1992 5652</a></div></section>
    <footer class="resume-footer"><div><small>COPYRIGHT</small><span>© 2026 Shanyao Gao.</span></div><div><small>LEGAL</small><span>All rights reserved.</span></div></footer>`);
});
