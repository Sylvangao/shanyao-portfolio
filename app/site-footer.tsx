'use client';
import { useEffect, useRef } from 'react';
import { ContactPopover } from './contact-popover';
export function SiteFooter({lang}: {lang:'zh'|'en'}) {
 const ref=useRef<HTMLElement>(null);
 const zh=lang==='zh';
 const basePath=process.env.NEXT_PUBLIC_BASE_PATH ?? '';
 useEffect(()=>{
  let frame=0;
  const update=()=>{frame=0;const footer=ref.current;
      if (footer) {
        const rect = footer.getBoundingClientRect();
        const footerTravel = Math.min(window.innerHeight, rect.height);
        const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / footerTravel));
        const eased = progress * progress * (3 - 2 * progress);
        const curveHeight = window.innerHeight * .1 * (1 - eased);
        const contentShift = -Math.min(210, window.innerHeight * .34) * (1 - eased);
        const buttonShift = -75 * (1 - eased);
        const chromeRaw = Math.max(0, Math.min(1, (progress - .12) / .48));
        const chromeReveal = chromeRaw * chromeRaw * (3 - 2 * chromeRaw);
        const clarityRaw = Math.max(0, Math.min(1, (progress - .55) / .28));
        const clarity = clarityRaw * clarityRaw * (3 - 2 * clarityRaw);
        footer.style.setProperty('--footer-curve-height', `${curveHeight}px`);
        footer.style.setProperty('--footer-content-shift', `${contentShift}px`);
        footer.style.setProperty('--footer-button-shift', `${buttonShift}px`);
        footer.style.setProperty('--footer-chrome-reveal', `${chromeReveal}`);
        footer.style.setProperty('--footer-text-clarity', `${clarity}`);
      }
  };
  const request=()=>{if(!frame)frame=requestAnimationFrame(update)};
  request();window.addEventListener('scroll',request,{passive:true});window.addEventListener('resize',request);
  return ()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',request);window.removeEventListener('resize',request)};
 },[]);
 return (
      <footer className="site-footer" id="contact" ref={ref}>
        <div className="footer-curve" aria-hidden="true"><span /></div>
        <div className="footer-cta">
          <div className="footer-message">
            <div className="footer-heading">
              <img src={`${basePath}/profile/shanyao-avatar-optimized.svg`} alt={zh ? '山药头像' : 'Portrait of Shanyao'} />
              <h2>{zh ? '一起打造更好的产品' : 'Let’s work together'}</h2>
            </div>
            <div className="footer-divider">
              <div className="footer-rule" aria-hidden="true" />
              <ContactPopover lang={lang} variant="footer" />
            </div>
            <div className="footer-contacts">
              <a href="mailto:nealgao@163.com">nealgao@163.com</a>
              <a href="tel:+8615319925652">+86 153 1992 5652</a>
            </div>
          </div>
        </div>
        <div className="footer-meta">
          <div><small>COPYRIGHT</small><span>© 2026 Shanyao Gao.</span></div>
          <div><small>LEGAL</small><span>All rights reserved.</span></div>
        </div>
      </footer>
 );
}
