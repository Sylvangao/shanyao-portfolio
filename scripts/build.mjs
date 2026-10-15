import { spawnSync } from 'node:child_process';

// The same Next.js runtime powers local previews and the static Pages build.
const result = spawnSync(
  process.execPath,
  ['node_modules/next/dist/bin/next', 'build', '--webpack'],
  {
    stdio: 'inherit',
    env: { ...process.env, DEPLOY_TARGET: 'github-pages', NEXT_TELEMETRY_DISABLED: '1' },
  },
);
if (result.status !== 0) process.exit(result.status ?? 1);
await import('./validate-export.mjs');
