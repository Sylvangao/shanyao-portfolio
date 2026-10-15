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
      const x = w - nw;
      // The second subpath is the transparent cutout. Slide it in from above.
      const path = (dy:number) => `path(evenodd, "M0 0H${w}V${h}H0Z M${x-r} ${dy} Q${x} ${dy} ${x} ${dy+r} V${dy+nh-r} Q${x} ${dy+nh} ${x+r} ${dy+nh} H${w-r} Q${w} ${dy+nh} ${w} ${dy+nh+r} H${w+2} V${dy-100} H${x-r} Z")`;
      card.style.setProperty('--project-clip-rest', path(-nh-r-2));
      card.style.setProperty('--project-clip-hover', path(0));
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
