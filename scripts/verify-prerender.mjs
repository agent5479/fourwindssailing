/**
 * Fail the build if prerendered HTML is missing crawlable SEO content.
 * Run after scripts/prerender.mjs.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PRERENDER_ROUTES } from './prerender-routes.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');

function routeToFile(route) {
  if (route === '/' || route === '') {
    return path.join(distDir, 'index.html');
  }
  const segment = route.replace(/^\//, '').replace(/\/$/, '');
  return path.join(distDir, segment, 'index.html');
}

const requiredSnippets = [
  'meta name="description"',
  'rel="canonical"',
  'application/ld+json',
  'jsonld-business',
  'Four Winds',
  '<h1',
  'data-static-prerender',
];

let failed = false;

for (const route of PRERENDER_ROUTES) {
  const file = routeToFile(route);
  if (!fs.existsSync(file)) {
    console.error(`FAIL ${route}: missing ${file}`);
    failed = true;
    continue;
  }
  const html = fs.readFileSync(file, 'utf8');
  if (html.length < 2000) {
    console.error(`FAIL ${route}: HTML too small (${html.length} bytes) — likely empty SPA shell`);
    failed = true;
  }
  for (const snip of requiredSnippets) {
    if (!html.includes(snip)) {
      console.error(`FAIL ${route}: missing "${snip}" in ${path.relative(process.cwd(), file)}`);
      failed = true;
    }
  }
  // Root should not be the only file if routes were requested
  if (!html.includes('data-prerender-route')) {
    console.error(`FAIL ${route}: missing data-prerender-route stamp`);
    failed = true;
  }
  console.log(`OK   ${route} → ${path.relative(process.cwd(), file)} (${html.length} bytes)`);
}

if (failed) {
  console.error('\nPrerender verification failed — static HTML is not safe for scrapers.');
  process.exit(1);
}

console.log(`\nVerified ${PRERENDER_ROUTES.length} static HTML pages for crawlers.`);
