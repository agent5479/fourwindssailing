/**
 * Write sitemap.xml and robots.txt into dist/ (and refresh public/) after prerender.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PRERENDER_ROUTES } from './prerender-routes.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');
const publicDir = path.join(__dirname, '..', 'public');

const siteUrl = (
  process.env.SITE_URL ||
  process.env.VITE_SITE_URL ||
  'https://agent5479.github.io/fourwindssailing'
).replace(/\/$/, '');

const lastmod = new Date().toISOString().slice(0, 10);

/** Priority / change hints for Google — homepage highest, booking util slightly lower. */
const ROUTE_META = {
  '/': { priority: '1.0', changefreq: 'weekly' },
  '/skipper': { priority: '0.9', changefreq: 'monthly' },
  '/charters': { priority: '0.9', changefreq: 'monthly' },
  '/about': { priority: '0.8', changefreq: 'monthly' },
  '/book': { priority: '0.7', changefreq: 'weekly' },
  '/contact': { priority: '0.8', changefreq: 'monthly' },
};

function writeSitemap(targetDir) {
  const urls = PRERENDER_ROUTES.map((route) => {
    const loc = route === '/' ? `${siteUrl}/` : `${siteUrl}${route}`;
    const meta = ROUTE_META[route] || { priority: '0.6', changefreq: 'monthly' };
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${meta.changefreq}</changefreq>
    <priority>${meta.priority}</priority>
  </url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;

  fs.writeFileSync(path.join(targetDir, 'sitemap.xml'), xml, 'utf8');
  console.log(`Wrote sitemap.xml (${PRERENDER_ROUTES.length} URLs) for ${siteUrl}`);
}

function writeRobots(targetDir) {
  // Keep crawlable for Google Search / Business URL inspection.
  // Disallow only non-content tooling paths if they ever appear under the site root.
  const robots = `# Four Winds Sailing — ${siteUrl}
# For Google Search Console & Google Business Profile URL attribution

User-agent: *
Allow: /

# Prefer HTTPS canonical host
User-agent: Googlebot
Allow: /

User-agent: Googlebot-Image
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;
  fs.writeFileSync(path.join(targetDir, 'robots.txt'), robots, 'utf8');
  console.log(`Wrote robots.txt → Sitemap: ${siteUrl}/sitemap.xml`);
}

if (!fs.existsSync(distDir)) {
  console.error('dist/ not found — run build first');
  process.exit(1);
}

writeSitemap(distDir);
writeRobots(distDir);
writeRobots(publicDir);
writeSitemap(publicDir);
