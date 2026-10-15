'use client';

import { useSyncExternalStore } from 'react';
export type Language = 'zh' | 'en';
const serverLanguage = (): Language => 'en';
const browserLanguage = (): Language =>
  new URLSearchParams(window.location.search).get('lang') === 'zh' ? 'zh' : 'en';
function subscribe(callback: () => void) {
  window.addEventListener('popstate', callback);
  return () => window.removeEventListener('popstate', callback);
}
// The server snapshot keeps static-export hydration stable; all pages resolve
// the query consistently, without a separate language-setting effect.
export function useLanguage(): Language {
  return useSyncExternalStore(subscribe, browserLanguage, serverLanguage);
}
