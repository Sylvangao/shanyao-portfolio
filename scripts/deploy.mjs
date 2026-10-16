import { spawnSync } from 'node:child_process';
import { pagesRunId } from './pages-run.mjs';

function run(command, args, capture = false) {
  const result = spawnSync(command, args, {
    stdio: capture ? 'pipe' : 'inherit',
    encoding: 'utf8',
  });
  if (result.status !== 0)
    throw new Error(`${command} ${args.join(' ')} failed. ${capture ? result.stderr : ''}`);
  return result.stdout?.trim() ?? '';
}
// Keep source changes reviewable: deploy only an already committed source tree.
const dirty = run('git', ['status', '--porcelain', '--untracked-files=normal'], true);
if (dirty.split('\n').some((line) => line && !line.slice(3).startsWith('docs/'))) {
  throw new Error(
    'Commit source changes before deploying; this command commits generated docs/ only.',
  );
}
run('npm', ['run', 'check']);
run('npm', ['run', 'build']);
run('npm', ['run', 'prepare:pages']);
run('git', ['add', '--', 'docs']);
if (run('git', ['diff', '--cached', '--name-only', '--', 'docs'], true)) {
  run('git', [
    '-c',
    'user.name=Codex',
    '-c',
    'user.email=codex@users.noreply.github.com',
    'commit',
    '--only',
    '-m',
    'Deploy static portfolio',
    '--',
    'docs',
  ]);
}
run('git', ['-c', 'http.version=HTTP/1.1', 'push', 'origin', 'main']);
const sha = run('git', ['rev-parse', 'HEAD'], true);
// Confirm the actual deployment for this commit, rather than the previous run.
console.log(`Waiting for GitHub Pages deployment of ${sha.slice(0, 7)}…`);
let runId;
for (let attempt = 0; attempt < 18; attempt++) {
  const runs = JSON.parse(
    run('gh', ['run', 'list', '--commit', sha, '--limit', '5', '--json', 'databaseId,name'], true),
  );
  runId = pagesRunId(runs);
  if (runId) break;
  await new Promise((resolve) => setTimeout(resolve, 5000));
}
if (!runId)
  throw new Error('Pushed successfully, but Pages has not started. Check GitHub Actions.');
run('gh', ['run', 'watch', String(runId), '--exit-status']);
console.log('Published: https://sylvangao.github.io/shanyao-portfolio/work/?lang=en');
