// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * GitHub Pages support — zero configuration.
 *
 * When the site is built by the included GitHub Actions workflow,
 * GITHUB_REPOSITORY ("owner/repo") is available and we derive:
 *   site → https://owner.github.io
 *   base → /repo            (project pages)
 *   base → /                (if the repo is named owner.github.io)
 *
 * You can override both with SITE_URL and BASE_PATH (e.g. for a custom domain).
 */
const repo = process.env.GITHUB_REPOSITORY ?? '';
const [owner, name] = repo.split('/');
const isUserSite = name && owner && name.toLowerCase() === `${owner.toLowerCase()}.github.io`;

const site =
  process.env.SITE_URL ?? (owner ? `https://${owner.toLowerCase()}.github.io` : 'https://example.github.io');
const base = process.env.BASE_PATH ?? (name && !isUserSite ? `/${name}` : '/');

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  build: { format: 'directory' },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  integrations: [sitemap()],
  devToolbar: { enabled: false },
});
