const projects = [
  { number: '01', title: 'Product experience', type: 'UX / Product design', year: '2026', className: 'project-blue' },
  { number: '02', title: 'A new identity', type: 'Brand / Visual system', year: '2026', className: 'project-coral' },
  { number: '03', title: 'Digital service', type: 'Research / Interface', year: '2025', className: 'project-lime' },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Shanyao home">Shanyao<span>®</span></a>
        <nav aria-label="Primary navigation"><a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a></nav>
        <p className="availability"><i /> Available for work</p>
      </header>
      <section className="hero" id="top">
        <p className="eyebrow">Independent designer · Shanghai</p>
        <h1>I design clear,<br />useful <em>experiences.</em></h1>
        <div className="hero-footer">
          <p>Product, interface and visual design for teams building thoughtful digital products.</p>
          <a className="round-link" href="#work" aria-label="View selected work">↓</a>
        </div>
      </section>
      <section className="work" id="work">
        <div className="section-heading"><p>Selected work</p><p>2025—26</p></div>
        <div className="project-list">
          {projects.map((project) => (
            <article className="project" key={project.number}>
              <div className={`project-visual ${project.className}`}>
                <span className="shape shape-a" /><span className="shape shape-b" />
                <p>{project.number}</p><strong>{project.title}</strong>
              </div>
              <div className="project-meta"><h2>{project.title}</h2><p>{project.type}</p><p>{project.year}</p></div>
            </article>
          ))}
        </div>
      </section>
      <section className="about" id="about">
        <p className="eyebrow">About</p>
        <div>
          <h2>I turn complexity into interfaces people understand.</h2>
          <p className="about-copy">I’m Shanyao, a designer working across product strategy, user experience and visual systems. This first version is ready for your real projects, process and outcomes.</p>
          <div className="capabilities"><p>Product design</p><p>UX research</p><p>Interaction design</p><p>Visual systems</p><p>Prototyping</p><p>Design direction</p></div>
        </div>
      </section>
      <footer id="contact">
        <p className="eyebrow">Have a project or role in mind?</p>
        <a href="mailto:hello@example.com">Let’s talk ↗</a>
        <div className="footer-meta"><p>Shanyao — Designer</p><p>© 2026</p></div>
      </footer>
    </main>
  );
}
