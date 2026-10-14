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

  const renderLines = () => {
    let wordIndex = 0;
    return words.map((line) => (
    <span className="headline-line" key={line}>
      {tokenize(line).map((word) => {
        const index = wordIndex++;
        const normalized = word.replace(/[，。！？、；：,.!?;:]/g, '').toLowerCase();
        const strong = emphasis.some((term) => term.toLowerCase().includes(normalized));
        return (
          <span className="headline-word-mask" key={`${line}-${index}`}>
            <span className={`headline-word${strong ? ' is-strong' : ''}`} style={{ '--word-delay': `${index * 50}ms` } as CSSProperties}>{word}</span>
          </span>
        );
      })}
    </span>
    ));
  };

  return (
    <Link className="focus-stage" href={href} onPointerMove={moveMask} aria-label={`${label} — Home`}>
      <h1 className="focus-title focus-base" aria-label={label}>
        {renderLines()}
      </h1>
      <h1 className="focus-title focus-clear" aria-hidden="true">
        {renderLines()}
      </h1>
    </Link>
  );
}
