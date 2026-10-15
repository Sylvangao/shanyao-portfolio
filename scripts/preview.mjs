import { createServer } from 'node:http';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { resolve, extname, sep } from 'node:path';

const root = resolve(process.env.PREVIEW_DIR ?? 'out');
const prefix = '/shanyao-portfolio';
const types = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ttf': 'font/ttf',
  '.woff2': 'font/woff2',
};
if (!existsSync(`${root}/work/index.html`)) throw new Error('Run npm run build first.');
createServer((request, response) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  } catch {
    response.writeHead(400).end();
    return;
  }
  if (pathname === '/') {
    response.writeHead(302, { Location: `${prefix}/work/` }).end();
    return;
  }
  if (!pathname.startsWith(`${prefix}/`)) {
    response.writeHead(404).end();
    return;
  }
  let file = resolve(root, `.${pathname.slice(prefix.length)}`);
  if (!file.startsWith(`${root}${sep}`)) {
    response.writeHead(403).end();
    return;
  }
  if (existsSync(file) && statSync(file).isDirectory()) file = resolve(file, 'index.html');
  if (!existsSync(file) || !statSync(file).isFile()) {
    response.writeHead(404).end();
    return;
  }
  response.writeHead(200, { 'Content-Type': types[extname(file)] ?? 'application/octet-stream' });
  response.end(readFileSync(file));
}).listen(Number(process.env.PORT ?? 4173), '127.0.0.1', () =>
  console.log(
    `Production preview: http://localhost:${process.env.PORT ?? 4173}${prefix}/work/?lang=en`,
  ),
);
