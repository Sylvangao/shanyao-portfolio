import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';

const root = resolve('out');
const prefix = '/shanyao-portfolio';
const walk = (directory) =>
  readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
for (const page of ['work', 'resume']) {
  if (!existsSync(join(root, page, 'index.html')))
    throw new Error(`Missing exported ${page} page.`);
}
let checked = 0;
for (const file of walk(root).filter((path) => path.endsWith('.html'))) {
  for (const match of readFileSync(file, 'utf8').matchAll(/(?:src|href)="([^"]+)"/g)) {
    const reference = match[1];
    if (/^(?:[a-z]+:|\/\/|#)/i.test(reference)) continue;
    const pathname = decodeURIComponent(reference.split(/[?#]/)[0]);
    if (!pathname) continue;
    if (pathname.startsWith('/') && !pathname.startsWith(`${prefix}/`)) {
      throw new Error(`Asset or link has the wrong Pages base path: ${reference}`);
    }
    let target = pathname.startsWith('/')
      ? resolve(root, `.${pathname.slice(prefix.length)}`)
      : resolve(dirname(file), pathname);
    if (existsSync(target) && statSync(target).isDirectory()) target = join(target, 'index.html');
    if (!existsSync(target)) throw new Error(`Broken exported asset/link: ${reference} in ${file}`);
    checked++;
  }
}
console.log(`Static export verified: ${checked} local asset/link references.`);
