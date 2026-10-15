'use client';

import { useEffect, useId, useRef } from 'react';

// Cut the complete glass surface (and its transparent artwork), rather than
// covering it with an opaque label panel. Measure labels so 2–3 tags fit.
export function ProjectCard({ project, lang, basePath }: {
  project: { slug:string; en:string; zh:string; cover?:string; labels:string[] };
  lang:'en'|'zh'; basePath:string;
}) {
  const shadowId = `project-shadow-${useId().replace(/:/g, '')}`;
  const root = useRef<HTMLAnchorElement>(null);
  const tags = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const card = root.current;
    const labels = tags.current;
    if (!card || !labels) return;
    const update = () => {
      const w = card.clientWidth;
      const h = card.querySelector<HTMLElement>('.portfolio-thumb')!.offsetHeight;
      const nw = Math.min(labels.offsetWidth + 20, w - 40);
      const nh = labels.offsetHeight + 20;
      const r = 24;
      const radius = window.innerWidth <= 760 ? 28 : 38;
      // The glass and its separate shadow share exactly the same outline.
      // No ancestor filter is used, so backdrop blur still sees the page.
      const path = (open:boolean) => {
        const n = open ? nw : 0;
        const t = open ? nh : 0;
        const c = open ? r : 0;
        return `path("M${radius} 0H${w-radius} Q${w} 0 ${w} ${radius} V${h-radius} Q${w} ${h} ${w-radius} ${h} H${n+c} Q${n} ${h} ${n} ${h-c} V${h-t+c} Q${n} ${h-t} ${n-c} ${h-t} H${radius} Q0 ${h-t} 0 ${h-t-radius} V${radius} Q0 0 ${radius} 0Z")`;
      };
      card.style.setProperty('--project-clip-rest', path(false));
      card.style.setProperty('--project-clip-hover', path(true));
    };
    const observer = new ResizeObserver(update);
    observer.observe(card);
    observer.observe(labels);
    update();
    document.fonts.ready.then(update);
    return () => observer.disconnect();
  }, []);
  return <a ref={root} className="project-card portfolio-card notched-project" href={`${basePath}/projects/${project.slug}/?lang=${lang}`} aria-label={lang === 'zh' ? `查看${project.zh}` : `View ${project.en}`}>
    <svg className="project-shape-shadow" aria-hidden="true" width="100%" height="100%">
      <defs><filter id={shadowId} x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
        <feGaussianBlur in="SourceAlpha" stdDeviation="12" result="blur" />
        <feOffset in="blur" dx="0" dy="8" result="offset" />
        <feFlood floodColor="#182239" floodOpacity="0.12" result="color" />
        <feComposite in="color" in2="offset" operator="in" result="shadow" />
        <feComposite in="shadow" in2="SourceAlpha" operator="out" />
      </filter></defs>
      <path className="project-shadow-outline" fill="black" filter={`url(#${shadowId})`} />
    </svg>
    <div className="portfolio-thumb portfolio-glass" data-backdrop={lang === 'zh' ? '精选项目' : 'Projects'}>
      {project.cover && <img className="portfolio-cover" src={`${basePath}${project.cover}`} alt={lang === 'zh' ? project.zh : project.en} loading="lazy" decoding="async" />}
    </div>
    <div ref={tags} className="project-independent-tags" aria-label={lang === 'zh' ? '项目分类' : 'Project categories'}>
      {project.labels.map((label,index)=><span className="project-tag" style={{ transitionDelay: `${index * 35}ms` }} key={`${label}-${index}`}>{label}</span>)}
    </div>
  </a>;
}
