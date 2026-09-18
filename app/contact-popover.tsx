'use client';

import { useEffect, useRef, useState } from 'react';

export function ContactPopover({ lang }: { lang: 'zh' | 'en' }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const zh = lang === 'zh';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

  useEffect(() => {
    const close = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', close);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', close);
      document.removeEventListener('keydown', escape);
    };
  }, []);

  return (
    <div className="hero-actions" ref={root}>
      <a className="social-trigger" href="https://dribbble.com/nealgao" target="_blank" rel="noreferrer" aria-label="View Shanyao on Dribbble">
        <img src={`${basePath}/icons/dribbble.svg`} alt="" aria-hidden="true" />
      </a>
      <div className="contact-action" data-open={open ? 'true' : 'false'}>
        <button
          className="contact-trigger"
          type="button"
          aria-expanded={open}
          aria-controls="wechat-contact-card"
          onClick={() => setOpen((value) => !value)}
        >
          <img src={`${basePath}/icons/wechat.svg`} alt="" aria-hidden="true" /><span>{zh ? '微信联系' : 'Let’s talk'}</span>
        </button>
        <div className="contact-popover" id="wechat-contact-card" role="dialog" aria-label={zh ? '微信联系方式' : 'WeChat contact'}>
          <img className="wechat-qr" src={`${basePath}/profile/shanyao-wechat-qr.jpg`} alt={zh ? '山药的微信二维码' : 'Shanyao’s WeChat QR code'} />
          <div className="contact-popover-copy">
            <strong>{zh ? '微信 · nealgao' : 'WeChat · nealgao'}</strong>
            <span>{zh ? '加我微信，聊聊你的项目。' : 'Add me and tell me about your project.'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
