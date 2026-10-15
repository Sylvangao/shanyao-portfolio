'use client';

import { TextReveal } from './text-reveal';
import { useCallback, useEffect, useId, useRef, useState } from 'react';

export function ContactPopover({
  lang,
  variant = 'hero',
  revealReady = true,
}: {
  lang: 'zh' | 'en';
  variant?: 'hero' | 'footer' | 'resume';
  revealReady?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [popoverSeen, setPopoverSeen] = useState(false);
  const [placement, setPlacement] = useState<'above' | 'below'>('above');
  const root = useRef<HTMLDivElement>(null);
  const zh = lang === 'zh';
  const popoverId = useId();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  const placePopover = useCallback(() => {
    const trigger = root.current?.querySelector<HTMLElement>('.contact-trigger');
    const popover = root.current?.querySelector<HTMLElement>('.contact-popover');
    if (!trigger || !popover) return;
    const triggerRect = trigger.getBoundingClientRect();
    const requiredSpace = popover.offsetHeight + 20;
    setPlacement(triggerRect.top < requiredSpace ? 'below' : 'above');
  }, []);

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

  useEffect(() => {
    if (!open) return;
    placePopover();
    window.addEventListener('scroll', placePopover, { passive: true });
    window.addEventListener('resize', placePopover);
    return () => {
      window.removeEventListener('scroll', placePopover);
      window.removeEventListener('resize', placePopover);
    };
  }, [open, placePopover]);

  return (
    <div
      className={
        variant === 'footer'
          ? 'footer-contact-root'
          : variant === 'resume'
            ? 'resume-wechat'
            : 'hero-actions'
      }
      ref={root}
      data-reveal-scope
    >
      {variant === 'hero' && (
        <a
          data-reveal-media
          className="social-trigger"
          href="https://dribbble.com/nealgao"
          target="_blank"
          rel="noreferrer"
          aria-label="View Shanyao on Dribbble"
        >
          <img src={`${basePath}/icons/dribbble.svg`} alt="" aria-hidden="true" />
        </a>
      )}
      <div
        className="contact-action"
        data-open={open ? 'true' : 'false'}
        data-placement={placement}
        onPointerEnter={() => {
          placePopover();
          setPopoverSeen(true);
        }}
        onFocusCapture={() => {
          placePopover();
          setPopoverSeen(true);
        }}
      >
        <button
          className={`contact-trigger${variant === 'footer' ? ' footer-contact-trigger' : ''}`}
          data-reveal-surface={variant !== 'footer' ? '' : undefined}
          type="button"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={popoverId}
          onPointerDown={(event) => {
            event.preventDefault();
            event.stopPropagation();
            placePopover();
            setOpen(true);
          }}
          onClick={(event) => {
            event.preventDefault();
            setOpen(true);
          }}
          onPointerMove={(event) => {
            if (variant !== 'footer' || event.pointerType === 'touch') return;
            const rect = event.currentTarget.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width - 0.5) * 22;
            const y = ((event.clientY - rect.top) / rect.height - 0.5) * 22;
            event.currentTarget.style.setProperty('--contact-x', `${x}px`);
            event.currentTarget.style.setProperty('--contact-y', `${y}px`);
            event.currentTarget.style.setProperty('--contact-label-x', `${x * 0.42}px`);
            event.currentTarget.style.setProperty('--contact-label-y', `${y * 0.42}px`);
          }}
          onPointerLeave={(event) => {
            event.currentTarget.style.setProperty('--contact-x', '0px');
            event.currentTarget.style.setProperty('--contact-y', '0px');
            event.currentTarget.style.setProperty('--contact-label-x', '0px');
            event.currentTarget.style.setProperty('--contact-label-y', '0px');
          }}
        >
          {variant !== 'footer' && (
            <img src={`${basePath}/icons/wechat.svg`} alt="" aria-hidden="true" />
          )}
          <span className="contact-label">
            <TextReveal
              syncMedia={variant === 'hero'}
              active={variant === 'footer' ? revealReady : undefined}
              granularity={variant === 'footer' ? 'line' : 'auto'}
              delay={variant === 'hero' ? 1100 : variant === 'footer' ? 150 : 0}
            >
              {variant === 'footer'
                ? zh
                  ? '联系我'
                  : 'Get in touch'
                : variant === 'resume'
                  ? zh
                    ? '加我微信'
                    : 'Let’s talk'
                  : zh
                    ? '聊一聊'
                    : 'Let’s talk'}
            </TextReveal>
          </span>
        </button>
        <div
          className={`contact-popover${variant === 'footer' ? ' footer-contact-popover' : ''}`}
          id={popoverId}
          role="dialog"
          aria-label={zh ? '微信联系方式' : 'WeChat contact'}
        >
          <img
            className="wechat-qr"
            src={`${basePath}/profile/shanyao-wechat-qr.jpg`}
            alt={zh ? '山药的微信二维码' : 'Shanyao’s WeChat QR code'}
          />
          <div className="contact-popover-copy">
            <strong>
              <TextReveal active={open || popoverSeen}>
                {zh ? '微信 · nealgao' : 'WeChat · nealgao'}
              </TextReveal>
            </strong>
            <span>
              <TextReveal delay={100} active={open || popoverSeen}>
                {zh ? '加我微信，聊聊你的项目。' : 'Add me and tell me about your project.'}
              </TextReveal>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
