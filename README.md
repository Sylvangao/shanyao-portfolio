# Shanyao portfolio

A static Next.js portfolio published to GitHub Pages from `main:/docs`.

## Local development

- `npm ci` installs the locked dependencies (Node 22.13+).
- `npm run dev` starts Next.js at http://localhost:5173/work/?lang=en.
- `npm run build` creates the production static export in `out/`, including the `/shanyao-portfolio` base path.
- `npm run preview` serves that exact export at http://localhost:4173/shanyao-portfolio/work/?lang=en.
- `npm run check` runs lint, TypeScript, shared-motion tests and formatting checks.
- `npm test` checks shared entrance observation, font readiness, reduced motion and scroll batching.
- `npm run format` formats maintained source files.

## Publishing

Commit source changes, then run `npm run deploy`. This checks the source, builds,
verifies exported local assets and links, backs up the previous `docs/` under ignored `work/deploy-backups/`, copies the
export, commits only generated `docs/`, pushes `main`, and waits for the matching
GitHub Pages deployment. Git authentication and GitHub CLI authentication must
already be available. Source changes are never automatically staged by the deploy
command. A failed check/build does not replace the currently published files.

For preparing output without publishing, use `npm run build && npm run prepare:pages`.

## Code ownership

- `app/globals.css` is the ordered stylesheet entry. The files under `app/styles/`
  retain the existing cascade order; change the relevant rule rather than adding
  a second override at the end of the entry file.
- `foundation.css`: base typography, hero, contacts and responsive foundations.
- `sections.css`: Why me, project grid, footer and project detail shells.
- `page-layouts.css`: ambient background and resume layouts.
- `shared-controls.css`: navigation, common frost, reveals and disclosure states.
- `theme-preview.css`: optional `?theme=dark` local design study.
- `interactions.css`: current project shapes, hero actions and media entrances.
- `app/motion/runtime.ts`: shared font readiness, one-shot viewport observer,
  reduced-motion subscription, reveal timing and keyframes.
- `TextReveal` and `RevealImage` use those services. Surface/media attributes keep
  labels, icons, backgrounds and portraits on the same entrance trigger.
- `useLanguage` supplies a consistent static-export-safe query language.
- `ProjectCard` measures its tags and shares a single path between the clipped
  glass and its separate shadow. Do not clip an ancestor around that shadow.
- `SiteHeader`, `SiteFooter` and `ContactPopover` are shared between pages.

When changing motion or layout, check Work and Resume at desktop and mobile sizes,
both languages, patent open/close, keyboard focus, and reduced motion. Check the
production export as well as development before publishing a structural change.
