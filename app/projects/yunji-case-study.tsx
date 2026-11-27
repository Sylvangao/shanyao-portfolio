'use client';

import { useLanguage } from '../use-language';
import { SiteHeader } from '../site-header';
import { SiteFooter } from '../site-footer';
import { TextReveal } from '../text-reveal';
import { yunjiChapters } from './yunji-content';

type Copy = readonly [string, string];
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
function Arrow({ back = false }: { back?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      style={back ? { rotate: '180deg' } : undefined}
    >
      <path
        d="M4 10h12m-5-5 5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function Figure({
  id,
  caption,
  zh,
  hero = false,
}: {
  id: string;
  caption: Copy;
  zh: boolean;
  hero?: boolean;
}) {
  return (
    <figure className={`yunji-figure${hero ? ' yunji-opening-image' : ''}`} data-reveal-surface>
      <a
        href={`${basePath}/projects/yunji/${id.toLowerCase()}.webp`}
        target="_blank"
        rel="noreferrer"
        aria-label={zh ? '打开原图查看细节' : 'Open image to view details'}
      >
        <img
          src={`${basePath}/projects/yunji/${id.toLowerCase()}.webp`}
          alt={caption[zh ? 0 : 1]}
          loading={hero ? 'eager' : 'lazy'}
          decoding="async"
          width="2400"
          height={id === 'S10' ? 1351 : id === 'S11' ? 1348 : 1500}
        />
      </a>
      <figcaption>
        <TextReveal granularity="line">{caption[zh ? 0 : 1]}</TextReveal>
        <span aria-hidden="true">↗</span>
      </figcaption>
    </figure>
  );
}

export function YunjiCaseStudy() {
  const lang = useLanguage();
  const zh = lang === 'zh';
  const copy = (text: readonly string[]) => text[zh ? 0 : 1];
  const back = `${basePath}/work/?lang=${lang}`;
  return (
    <main id="top" className="project-detail-page yunji-case" lang={zh ? 'zh-CN' : 'en'}>
      <SiteHeader active="work" lang={lang} languagePath="/projects/yunji/" />
      <div className="yunji-ambient" aria-hidden="true" />
      <header className="yunji-hero yunji-width">
        <a href={back} className="yunji-back">
          <Arrow back />
          <TextReveal>{zh ? '全部作品' : 'All projects'}</TextReveal>
        </a>
        <p className="yunji-eyebrow">
          <TextReveal delay={80}>
            {zh ? '腾讯 · 企业内容协作 · 2023—2025' : 'TENCENT · CONTENT COLLABORATION · 2023—2025'}
          </TextReveal>
        </p>
        <h1>
          <TextReveal delay={140}>{zh ? '云迹' : 'Yunji'}</TextReveal>
          <span>
            <TextReveal delay={220}>
              {zh ? '让内容，连接协作。' : 'Where content meets collaboration.'}
            </TextReveal>
          </span>
        </h1>
        <p className="yunji-intro">
          <TextReveal delay={300} granularity="line">
            {zh
              ? '独立完成企业内容协作产品的早期体验设计，将文档、任务与智能表格组织进统一的工作空间，支持内部孵化与后续产品演进。'
              : 'Designing an enterprise collaboration product from its earliest stage—bringing documents, tasks and databases into one workspace, from internal incubation to the next chapter of Lexiang.'}
          </TextReveal>
        </p>
        <dl className="yunji-facts">
          {[
            [
              ['我的角色', 'My role'],
              ['早期独立产品设计', 'Sole early-stage product designer'],
            ],
            [
              ['设计范围', 'Scope'],
              ['信息架构 / 交互 / UI / 初步品牌', 'IA / Interaction / UI / Early branding'],
            ],
            [
              ['早期团队', 'Early team'],
              ['2 产品 · 14 研发 · 1 设计', '2 PMs · 14 engineers · 1 designer'],
            ],
            [
              ['核心建设', 'Core build'],
              ['2023.11—2024.06', 'Nov 2023—Jun 2024'],
            ],
          ].map(([label, value]) => (
            <div key={label[1]}>
              <dt>
                <TextReveal delay={350}>{copy(label)}</TextReveal>
              </dt>
              <dd>
                <TextReveal delay={400}>{copy(value)}</TextReveal>
              </dd>
            </div>
          ))}
        </dl>
      </header>
      <div className="yunji-width">
        <Figure
          id="S01"
          zh={zh}
          hero
          caption={[
            '云迹：文档、任务与内容协作的统一工作空间。',
            'Yunji: one workspace for documents, tasks and content collaboration.',
          ]}
        />
      </div>
      <nav
        className="yunji-index yunji-width"
        aria-label={zh ? '案例章节' : 'Case study navigation'}
      >
        {[
          ['context', '项目背景', 'Context'],
          ['workspace', '设计展开', 'Design'],
          ['tasks', '关键取舍', 'Trade-offs'],
          ['delivery', '落地与反思', 'Delivery'],
        ].map(([id, cn, en], i) => (
          <a href={`#${id}`} key={id}>
            <span>0{i + 1}</span>
            {zh ? cn : en}
          </a>
        ))}
      </nav>
      <article className="yunji-story yunji-width">
        {yunjiChapters.map((chapter, index) => (
          <section
            className={`yunji-chapter${chapter.id === 'reflection' ? ' yunji-reflection' : ''}`}
            id={chapter.id}
            key={chapter.id}
          >
            <div className="yunji-chapter-heading">
              <p className="yunji-eyebrow">
                <TextReveal>{`${String(index + 1).padStart(2, '0')} / ${copy(chapter.label)}`}</TextReveal>
              </p>
              <h2>
                <TextReveal granularity="line">{copy(chapter.title)}</TextReveal>
              </h2>
            </div>
            <div className="yunji-copy">
              {chapter.paragraphs.map((p, i) => (
                <p key={i}>
                  <TextReveal granularity="line" delay={i * 80}>
                    {copy(p)}
                  </TextReveal>
                </p>
              ))}
            </div>
            {chapter.id === 'system' && (
              <div className="yunji-pillars">
                {[
                  [
                    '文档',
                    'Documents',
                    '承载说明、讨论与知识',
                    'Capture ideas, discussion and knowledge',
                  ],
                  [
                    '任务',
                    'Tasks',
                    '连接来源、责任与执行',
                    'Connect context, ownership and action',
                  ],
                  [
                    '智能表格',
                    'Databases',
                    '组织记录，切换工作视角',
                    'Structure records, switch perspectives',
                  ],
                ].map(([cn, en, desc, descEn], i) => (
                  <div key={en} data-reveal-surface>
                    <span className="yunji-pillar-number">0{i + 1}</span>
                    <h3>
                      <TextReveal>{zh ? cn : en}</TextReveal>
                    </h3>
                    <p>{zh ? desc : descEn}</p>
                  </div>
                ))}
              </div>
            )}
            {chapter.id === 'navigation' && (
              <ol
                className="yunji-hierarchy"
                aria-label={zh ? '保留的四层组织结构' : 'The retained four-level hierarchy'}
              >
                {(zh
                  ? ['公司', '团队空间', '知识库', '文档']
                  : ['Company', 'Team space', 'Knowledge base', 'Document']
                ).map((label, i) => (
                  <li key={label} data-reveal-surface>
                    <span>0{i + 1}</span>
                    <TextReveal>{label}</TextReveal>
                  </li>
                ))}
              </ol>
            )}
            {chapter.id === 'tasks' && (
              <div className="yunji-decision" data-reveal-surface>
                <p className="yunji-eyebrow">{zh ? 'MVP 设计取舍' : 'THE MVP DECISION'}</p>
                <h3>
                  <TextReveal granularity="line">
                    {zh
                      ? '先建立完整流程，再增加复杂规则。'
                      : 'A complete basic flow before advanced rules.'}
                  </TextReveal>
                </h3>
                <p>
                  {zh
                    ? '创建任务 → 通知负责人 → 跟踪执行'
                    : 'Create a task → Notify its owner → Track execution'}
                </p>
              </div>
            )}
            {'image' in chapter && <Figure id={chapter.image} caption={chapter.caption} zh={zh} />}
            {'secondaryImage' in chapter && (
              <Figure id={chapter.secondaryImage} caption={chapter.secondaryCaption} zh={zh} />
            )}
            {chapter.id === 'delivery' && (
              <ol className="yunji-timeline">
                {[
                  [
                    '2023.11',
                    '内部孵化立项',
                    'Incubation begins',
                    '独立负责早期核心产品设计',
                    'Sole designer for the early core product',
                  ],
                  [
                    '2024.06',
                    '核心场景验证',
                    'Core scenarios validated',
                    '完成核心覆盖与企业内场景验证',
                    'Core coverage and internal enterprise validation',
                  ],
                  [
                    '2025.01',
                    '融合乐享 2.0',
                    'Into Lexiang 2.0',
                    '融合形成 MVP，后续转向移动端及部分功能',
                    'Merged MVP; later scope shifts to mobile and selected features',
                  ],
                ].map(([date, cn, en, desc, descEn]) => (
                  <li key={date} data-reveal-surface>
                    <time>{date}</time>
                    <h3>
                      <TextReveal>{zh ? cn : en}</TextReveal>
                    </h3>
                    <p>{zh ? desc : descEn}</p>
                  </li>
                ))}
              </ol>
            )}
          </section>
        ))}
      </article>
      <div className="yunji-return yunji-width">
        <a href={back} data-reveal-surface>
          <TextReveal>{zh ? '返回全部作品' : 'Back to all projects'}</TextReveal>
          <Arrow />
        </a>
        <a href="#top">{zh ? '回到顶部' : 'Back to top'} ↑</a>
      </div>
      <SiteFooter lang={lang} />
    </main>
  );
}
