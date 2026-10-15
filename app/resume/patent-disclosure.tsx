'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { TextReveal } from '../text-reveal';
import patents from './patents.json';
import { motion, prefersReducedMotion } from '../motion/runtime';
function PatentIcon({ kind }: { kind: 'chevron' | 'external' }) {
  return (
    <svg
      className={`patent-icon patent-icon-${kind}`}
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {kind === 'chevron' ? (
        <path d="m5 7.5 5 5 5-5" />
      ) : (
        <>
          <path d="M6 14 14 6" />
          <path d="M6.5 6H14v7.5" />
        </>
      )}
    </svg>
  );
}
export function PatentDisclosure({
  company,
  lang,
}: {
  company: 'zhihu' | 'meizu';
  lang: 'en' | 'zh';
}) {
  const [expanded, setExpanded] = useState(false);
  const [contentReady, setContentReady] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  useEffect(() => {
    const shell = shellRef.current,
      content = contentRef.current;
    if (!shell || !content) return;
    let cancelled = false;
    const reduced = prefersReducedMotion();
    const from = shell.getBoundingClientRect().height;
    setContentReady(false);
    const target = expanded ? content.scrollHeight : 0;
    const animation = shell.animate(
      [
        {
          height: `${expanded ? Math.max(2, from) : from}px`,
          marginTop: from > 0 ? '16px' : '0px',
          opacity: expanded ? 1 : 1,
          borderRadius: expanded && from < 3 ? '1px' : '14px',
        },
        {
          height: `${target}px`,
          marginTop: expanded ? '16px' : '0px',
          opacity: expanded ? 1 : 0,
          borderRadius: expanded ? '14px' : '1px',
        },
      ],
      {
        duration: reduced ? 0 : motion.disclosureDuration,
        delay: reduced || expanded ? 0 : motion.disclosureCloseLead,
        easing: 'cubic-bezier(.22,1,.36,1)',
        fill: 'both',
      },
    );
    const revealTimer = expanded
      ? window.setTimeout(
          () => {
            if (!cancelled) setContentReady(true);
          },
          reduced ? 0 : motion.disclosureContentLead,
        )
      : undefined;
    animation.finished.then(
      () => {
        if (cancelled) return;
        shell.style.height = expanded ? 'auto' : '0px';
        shell.style.marginTop = expanded ? '16px' : '0px';
        shell.style.opacity = expanded ? '1' : '0';
        shell.style.borderRadius = expanded ? '14px' : '1px';
        animation.cancel();
        if (expanded) setContentReady(true);
      },
      () => {},
    );
    return () => {
      cancelled = true;
      clearTimeout(revealTimer);
      shell.style.height = `${shell.getBoundingClientRect().height}px`;
      animation.cancel();
    };
  }, [expanded]);
  const zh = lang === 'zh',
    records = patents.filter((p) => p.company === company);
  return (
    <div className="resume-patents" data-open={expanded} data-content-ready={contentReady}>
      <button
        className="patent-summary"
        type="button"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={() => setExpanded((value) => !value)}
      >
        <span>
          <TextReveal>
            {zh
              ? `参与申请 ${records.length} 项专利`
              : `Contributed to ${records.length} patent applications`}
          </TextReveal>
        </span>
        <span className="patent-disclosure-hint">
          <span className="patent-label-closed">
            <TextReveal>{zh ? '查看明细' : 'View patents'}</TextReveal>
          </span>
          <span className="patent-label-open">
            <TextReveal>{zh ? '收起明细' : 'Hide patents'}</TextReveal>
          </span>
          <PatentIcon kind="chevron" />
        </span>
      </button>
      <div className="patent-expansion" ref={shellRef} id={panelId} inert={!contentReady}>
        <div className="patent-expansion-inner" ref={contentRef}>
          <div className="patent-records">
            <p className="patent-note">
              <TextReveal active={contentReady} delay={0}>
                {zh
                  ? '按公开记录整理 · 包含发明与外观设计 · 名称沿用官方中文'
                  : 'Public records · Invention & design patents · Official Chinese titles'}
              </TextReveal>
            </p>
            <ul>
              {records.map((p) => (
                <li key={p.number}>
                  <a
                    href={`https://patents.google.com/patent/${p.number}/${zh ? 'zh' : 'en'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${p.title}, ${p.number}${zh ? '，新标签页打开' : ' — opens in a new tab'}`}
                  >
                    <span className="patent-name" data-reveal-surface lang="zh-CN">
                      <span className="patent-title">
                        <TextReveal active={contentReady} delay={0}>
                          {p.title}
                        </TextReveal>
                      </span>
                      <PatentIcon kind="external" />
                    </span>
                    <span className="patent-meta">
                      <span>
                        <TextReveal
                          active={contentReady}
                          delay={0}
                        >{`${zh ? '申请号' : 'Application'} ${p.application}`}</TextReveal>
                      </span>
                      <span>
                        <TextReveal
                          active={contentReady}
                          delay={0}
                        >{`${zh ? '公开号' : 'Publication'} ${p.number}`}</TextReveal>
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
