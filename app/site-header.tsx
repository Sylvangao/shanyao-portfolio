export function SiteHeader({ active, lang }: { active: 'work' | 'resume'; lang: 'zh' | 'en' }) {
  const suffix = lang === 'zh' ? '?lang=zh' : '?lang=en';
  return (
    <header className="site-header">
      <a className="wordmark" href={`/work${suffix}`} aria-label="Shanyao work">Shanyao<span>®</span></a>
      <nav className={`page-tabs active-${active}`} aria-label="Primary navigation">
        <span className="tab-glider" aria-hidden="true" />
        <a className={active === 'work' ? 'active' : ''} href={`/work${suffix}`}>Work</a>
        <a className={active === 'resume' ? 'active' : ''} href={`/resume${suffix}`}>Resume</a>
      </nav>
      <a className="language-switch" href={`${active === 'work' ? '/work' : '/resume'}?lang=${lang === 'zh' ? 'en' : 'zh'}`} aria-label={lang === 'zh' ? 'Switch to English' : '切换到中文'}>
        <span className={lang === 'en' ? 'selected' : ''}>EN</span><i /><span className={lang === 'zh' ? 'selected' : ''}>中</span>
      </a>
    </header>
  );
}
