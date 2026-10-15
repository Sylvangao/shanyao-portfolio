'use client';

import { useEffect, useRef } from 'react';

// Cut the complete glass surface (and its transparent artwork), rather than
// covering it with an opaque label panel. Measure labels so 2–3 tags fit.
export function ProjectCard({ project, lang, basePath }: {
  project: { slug:string; en:string; zh:string; cover?:string; labels:string[] };
  lang:'en'|'zh'; basePath:string;
}) {
  const root = useRef<HTMLAnchorElement>(null);
  const tags = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const card = root.current;
    const labels = tags.current;
    if (!card || !labels) return;
    const update = () => {
      const w = card.clientWidth;
      const h = card.querySelector<HTMLElement>('.portfolio-thumb')!.offsetHeight;
      const nw = Math.min(labels.offsetWidth + 14, w - 40);
      const nh = labels.offsetHeight + 12;
      const r = 24;
      // A single bounded outline also clips the glass shadow: subtracting an
      // outside subpath can accidentally leave a pale slab below the notch.
      const path = (open:boolean) => {
        const n = open ? nw : 0;
        const t = open ? nh : 0;
        const c = open ? r : 0;
        return `path("M0 0H${w}V${h}H${n+c} Q${n} ${h} ${n} ${h-c} V${h-t+c} Q${n} ${h-t} ${n-c} ${h-t} H${c} Q0 ${h-t} 0 ${h-t-c} V0Z")`;
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
    <div className="portfolio-thumb portfolio-glass" data-backdrop={lang === 'zh' ? '精选项目' : 'Projects'}>
      {project.cover && <img className="portfolio-cover" src={`${basePath}${project.cover}`} alt={lang === 'zh' ? project.zh : project.en} loading="lazy" decoding="async" />}
    </div>
    <div ref={tags} className="project-independent-tags" aria-label={lang === 'zh' ? '项目分类' : 'Project categories'}>
      {project.labels.map((label,index)=><span className="project-tag" key={`${label}-${index}`}>{label}</span>)}
    </div>
  </a>;
}
