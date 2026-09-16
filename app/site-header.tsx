import Link from 'next/link';

export function SiteHeader({ active, lang }: { active: 'work' | 'resume'; lang: 'zh' | 'en' }) {
  const suffix = lang === 'zh' ? '?lang=zh' : '?lang=en';
  return (
    <header className="site-header">
      <Link className="wordmark" href={`/work${suffix}`} aria-label="Shanyao work">Shanyao<span>®</span></Link>
      <nav className={`page-tabs active-${active}`} aria-label="Primary navigation">
        <span className="tab-glider" aria-hidden="true" />
        <Link className={active === 'work' ? 'active' : ''} href={`/work${suffix}`}>Work</Link>
        <Link className={active === 'resume' ? 'active' : ''} href={`/resume${suffix}`}>Resume</Link>
      </nav>
      <Link className="language-switch" href={`${active === 'work' ? '/work' : '/resume'}?lang=${lang === 'zh' ? 'en' : 'zh'}`} aria-label={lang === 'zh' ? 'Switch to English' : '切换到中文'}>
        <span className={lang === 'en' ? 'selected' : ''}>EN</span><i /><span className={lang === 'zh' ? 'selected' : ''}>中</span>
      </Link>
    </header>
  );
}
