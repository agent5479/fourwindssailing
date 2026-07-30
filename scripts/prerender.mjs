/**
 * Post-build prerender: visit each route in a headless browser and write static HTML
 * so Googlebot / scrapers receive real content without executing JS.
 */
import { createServer } from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import sirv from 'sirv';
import { PRERENDER_ROUTES } from './prerender-routes.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const previewPort = 4173;
const previewUrl = `http://127.0.0.1:${previewPort}`;
const basePath = (process.env.VITE_BASE || '/').replace(/\/$/, '');

function routeToFile(route) {
  if (route === '/' || route === '') {
    return path.join(distDir, 'index.html');
  }
  const segment = route.replace(/^\//, '').replace(/\/$/, '');
  return path.join(distDir, segment, 'index.html');
}

function startStaticServer() {
  const serve = sirv(distDir, {
    dev: true,
    single: true,
  });

  const server = createServer((req, res) => {
    let url = req.url || '/';
    if (basePath && (url === basePath || url.startsWith(`${basePath}/`))) {
      req.url = url.slice(basePath.length) || '/';
    }
    serve(req, res, () => {
      res.statusCode = 404;
      res.end('Not found');
    });
  });

  return new Promise((resolve, reject) => {
    server.on('error', reject);
    server.listen(previewPort, '127.0.0.1', () => {
      resolve(server);
    });
  });
}

/** Ensure crawlers see absolute asset URLs and a marker that SSG ran. */
function polishHtml(html, route) {
  let out = html;
  // Help scrapers: explicit generator note in a comment (not visible)
  if (!out.includes('data-static-prerender')) {
    out = out.replace('<html', '<html data-static-prerender="fourwindssailing"');
  }
  // Stamp which route was baked
  out = out.replace(
    '<body',
    `<body data-prerender-route="${route === '/' ? '/' : route}"`
  );
  return out;
}

async function prerender() {
  if (!fs.existsSync(distDir)) {
    throw new Error('dist/ not found — run vite build first');
  }

  const server = await startStaticServer();

  try {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    for (const route of PRERENDER_ROUTES) {
      const urlPath = route === '/' ? `${basePath}/` || '/' : `${basePath}${route}`;
      const url = `${previewUrl}${urlPath}`;
      console.log(`Prerendering ${route} → ${url}`);

      await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });

      // Wait until React has painted crawlable content + SEO tags
      await page.waitForFunction(
        () => {
          const desc = document.querySelector('meta[name="description"]')?.getAttribute('content');
          const h1 = document.querySelector('main h1, .hero__title, .page-hero h1');
          const ready = document.documentElement.getAttribute('data-app-ready') === 'true';
          const jsonld = document.getElementById('jsonld-business');
          return Boolean(desc && desc.length > 40 && h1 && h1.textContent?.trim() && ready && jsonld);
        },
        { timeout: 20000 }
      );

      await new Promise((r) => setTimeout(r, 150));

      let html = await page.content();
      html = polishHtml(html, route);

      const outFile = routeToFile(route);
      fs.mkdirSync(path.dirname(outFile), { recursive: true });
      fs.writeFileSync(outFile, html, 'utf8');
      console.log(`  wrote ${path.relative(rootDir, outFile)} (${html.length} bytes)`);
    }

    await browser.close();

    // SPA fallback for unknown paths on GitHub Pages
    const indexHtml = path.join(distDir, 'index.html');
    fs.copyFileSync(indexHtml, path.join(distDir, '404.html'));

    console.log(`Prerendered ${PRERENDER_ROUTES.length} routes into dist/`);
  } finally {
    server.close();
  }
}

prerender().catch((err) => {
  console.error(err);
  process.exit(1);
});
