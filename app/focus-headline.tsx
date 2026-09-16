'use client';

import type { PointerEvent } from 'react';
import Link from 'next/link';

export function FocusHeadline({ words, label, href }: { words: string[]; label: string; href: string }) {
  const moveMask = (event: PointerEvent<HTMLAnchorElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`);
  };

  return (
    <Link className="focus-stage" href={href} onPointerMove={moveMask} aria-label={`${label} — Home`}>
      <h1 className="focus-title focus-base" aria-label={label}>
        {words.map((word) => <span key={word}>{word}</span>)}
      </h1>
      <h1 className="focus-title focus-clear" aria-hidden="true">
        {words.map((word) => <span key={word}>{word}</span>)}
      </h1>
    </Link>
  );
}
