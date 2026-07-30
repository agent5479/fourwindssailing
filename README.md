# Four Winds Sailing

Portfolio and booking site for **Tom Billingham** — skipper for hire and private sailing charters in **Golden Bay, New Zealand**.

- Site: [fourwindssailing.nz](https://fourwindssailing.nz)
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

## Build (static / SEO)

```bash
npm run build:static
```

Outputs prerendered pages under `dist/`, plus `robots.txt` and `sitemap.xml`. Canonical origin defaults to `https://fourwindssailing.nz` (`VITE_SITE_URL` / `SITE_URL`).

Preview:

```bash
npm run preview
```

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
