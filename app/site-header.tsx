export function SiteHeader({ active, lang }: { active: 'work' | 'resume'; lang: 'zh' | 'en' }) {
  const suffix = lang === 'zh' ? '?lang=zh' : '?lang=en';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  return (
    <header className="site-header">
      <a className="wordmark" href={`${basePath}/work/${suffix}`} aria-label="Shanyao work">
        <img src={`${basePath}/favicon.svg`} alt="" aria-hidden="true" />
        <b>Shanyao<span className="registered-mark">®</span></b>
      </a>
      <nav className={`page-tabs active-${active}`} aria-label="Primary navigation">
        <span className="tab-glider" aria-hidden="true" />
        <a className={active === 'work' ? 'active' : ''} href={`${basePath}/work/${suffix}`}>Work</a>
        <a className={active === 'resume' ? 'active' : ''} href={`${basePath}/resume/${suffix}`}>Resume</a>
      </nav>
      <a className="language-switch" href={`${basePath}/${active === 'work' ? 'work' : 'resume'}/?lang=${lang === 'zh' ? 'en' : 'zh'}`} aria-label={lang === 'zh' ? 'Switch to English' : '切换到中文'}>
        <span className={lang === 'en' ? 'selected' : ''}>EN</span><i /><span className={lang === 'zh' ? 'selected' : ''}>中</span>
      </a>
    </header>
  );
}
