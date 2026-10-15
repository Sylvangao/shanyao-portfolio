import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // Assets are precompressed SVG/JPEG files served by static GitHub Pages;
    // there is no server-side Next Image optimizer in this deployment.
    rules: { '@next/next/no-img-element': 'off' },
  },
  globalIgnores([
    '.next/**',
    'out/**',
    'docs/**',
    'dist/**',
    'work/**',
    'build/**',
    'next-env.d.ts',
  ]),
]);

export default eslintConfig;
