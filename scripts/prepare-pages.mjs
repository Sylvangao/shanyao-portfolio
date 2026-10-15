import { cpSync, existsSync, mkdirSync, renameSync, writeFileSync } from 'node:fs';

if (!existsSync('out/work/index.html'))
  throw new Error('Run npm run build before preparing Pages.');
mkdirSync('work/deploy-backups', { recursive: true });
const stamp = Date.now();
const staging = `work/deploy-backups/staging-${stamp}`;
// Complete the copy before touching the previous output.
cpSync('out', staging, { recursive: true });
writeFileSync(`${staging}/.nojekyll`, '');
if (existsSync('docs')) renameSync('docs', `work/deploy-backups/docs-${stamp}`);
renameSync(staging, 'docs');
console.log(
  'Prepared docs/ for GitHub Pages. Previous output is backed up in work/deploy-backups/.',
);
