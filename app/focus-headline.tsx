'use client';

import type { CSSProperties, PointerEvent } from 'react';
import Link from 'next/link';

function tokenize(line: string) {
  if (/\s/.test(line)) return line.trim().split(/\s+/);
  return Array.from(line).reduce<string[]>((tokens, character) => {
    if (/^[，。！？、；：,.!?;:]$/.test(character) && tokens.length) tokens[tokens.length - 1] += character;
    else tokens.push(character);
    return tokens;
  }, []);
}

export function FocusHeadline({ words, label, href, emphasis = [] }: { words: string[]; label: string; href: string; emphasis?: string[] }) {
  const moveMask = (event: PointerEvent<HTMLAnchorElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`);
  };

  let wordIndex = 0;
  const renderLines = (animated: boolean) => words.map((line) => (
    <span className="headline-line" key={line}>
      {tokenize(line).map((word) => {
        const index = wordIndex++;
        const normalized = word.replace(/[，。！？、；：,.!?;:]/g, '').toLowerCase();
        const strong = emphasis.some((term) => term.toLowerCase().includes(normalized));
        return <span className={`headline-word${strong ? ' is-strong' : ''}`} style={animated ? { '--word-delay': `${index * 75}ms` } as CSSProperties : undefined} key={`${line}-${index}`}>{word}</span>;
      })}
    </span>
  ));

  return (
    <Link className="focus-stage" href={href} onPointerMove={moveMask} aria-label={`${label} — Home`}>
      <h1 className="focus-title focus-base" aria-label={label}>
        {renderLines(true)}
      </h1>
      <h1 className="focus-title focus-clear" aria-hidden="true">
        {renderLines(false)}
      </h1>
    </Link>
  );
}
