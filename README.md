# Four Winds Sailing

Portfolio and booking site for **Tom Billingham** — skipper for hire and private sailing charters in **Golden Bay, New Zealand**.

- Live (GitHub Pages): https://agent5479.github.io/fourwindssailing/
- Custom domain (later): fourwindssailing.nz
- Facebook: [profile](https://www.facebook.com/profile.php?id=61590890969011)

## Stack

Vite + React 19 + TypeScript + React Router. Post-build Playwright prerender writes static HTML per route for search engines (`robots.txt` + `sitemap.xml`).

## Develop

```bash
npm install
cp .env.example .env.local
npm run dev
```

Optional: set `VITE_FORM_ENDPOINT` in `.env.local` for a live Google Apps Script booking backend. Without it, the charter booking wizard uses local mock availability.

## Deploy (GitHub Pages via Actions)

Push to `main` runs [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml):
`npm run build:static` then deploys `dist/`.

Live URL: https://agent5479.github.io/fourwindssailing/

In the repo: **Settings → Pages → Source: GitHub Actions** (required once).

### Google Search Console / Business

1. Verify the property (URL prefix: the live Pages URL, later `https://fourwindssailing.nz`).
2. Optional HTML-tag verification: add repo secret `GOOGLE_SITE_VERIFICATION` (token only); the workflow injects it as `VITE_GOOGLE_SITE_VERIFICATION`.
3. Submit `…/sitemap.xml` in Search Console.
4. In Google Business Profile, set the website to the same canonical URL.

SEO includes LocalBusiness + Person JSON-LD, Open Graph / Twitter cards, geo meta (NZ-TAS / Golden Bay), and an allow-all `robots.txt` pointing at the sitemap.

### Static HTML for crawlers

`npm run build:static` prerenders every route to `dist/<route>/index.html` (Playwright), then `verify-prerender` fails the build if pages look like empty SPA shells. GitHub Actions deploys those files so scrapers receive titles, meta, JSON-LD, and visible `<h1>` content without running JavaScript.

## Pages

| Path | Purpose |
|------|---------|
| `/` | Portfolio landing |
| `/skipper` | Skipper for hire (primary) |
| `/charters` | Private charter packages |
| `/book` | Charter booking wizard |
| `/about` | Tom + yacht + credentials (SRL, RYA Yachtmaster) |
| `/contact` | Enquiry + Facebook |

## Credentials shown

- Skipper Restricted Limits (SRL) — Maritime New Zealand
- RYA Yachtmaster
