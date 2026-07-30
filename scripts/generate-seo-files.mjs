/**
 * Write sitemap.xml and robots.txt into dist/ after prerender.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PRERENDER_ROUTES } from './prerender-routes.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');
const publicDir = path.join(__dirname, '..', 'public');

const siteUrl = (process.env.SITE_URL || process.env.VITE_SITE_URL || 'https://fourwindssailing.nz').replace(
  /\/$/,
  ''
);

function writeSitemap(targetDir) {
  const urls = PRERENDER_ROUTES.map((route) => {
    const loc = route === '/' ? siteUrl : `${siteUrl}${route}`;
    return `  <url>\n    <loc>${loc}</loc>\n  </url>`;
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
  const robots = `User-agent: *
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
