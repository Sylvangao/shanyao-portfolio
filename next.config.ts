import type { NextConfig } from 'next';

const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_BASE_PATH: isGitHubPages ? '/shanyao-portfolio' : '',
  },
  ...(isGitHubPages
    ? {
        output: 'export',
        basePath: '/shanyao-portfolio',
        assetPrefix: '/shanyao-portfolio/',
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
