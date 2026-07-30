import { useEffect } from 'react';
import {
  SEO_DEFAULT_DESCRIPTION,
  SEO_DEFAULT_TITLE,
  SEO_GEO_PLACENAME,
  SEO_GEO_POSITION,
  SEO_GEO_REGION,
  SEO_KEYWORDS,
  SEO_LOCALE,
  SEO_OG_IMAGE,
  SEO_OG_IMAGE_ALT,
  SITE_NAME,
  SITE_OWNER,
} from '../data/siteConfig';
import { absoluteUrl, buildJsonLd, buildWebPageJsonLd, getSiteUrl } from '../data/seo';

interface SeoProps {
  title: string;
  description: string;
  path: string;
  bodyClass?: string;
  image?: string;
  imageAlt?: string;
  /** Override robots; default index,follow with rich snippets friendly flags */
  robots?: string;
  /** Optional page type for og:type (website | profile | article) */
  ogType?: string;
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string, attrs?: Record<string, string>) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
  if (attrs) {
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  }
}

function upsertJsonLd(id: string, data: unknown) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function applySeo({
  title,
  description,
  path,
  bodyClass,
  image,
  imageAlt,
  robots,
  ogType,
}: SeoProps) {
  if (typeof document === 'undefined') return;

  const siteUrl = getSiteUrl();
  const pageUrl = absoluteUrl(path === '/' ? '/' : path, siteUrl);
  const ogImagePath = image || SEO_OG_IMAGE;
  const ogImageUrl = absoluteUrl(ogImagePath, siteUrl);
  const ogAlt = imageAlt || SEO_OG_IMAGE_ALT;
  const pageTitle = title || SEO_DEFAULT_TITLE;
  const pageDescription = description || SEO_DEFAULT_DESCRIPTION;

  document.title = pageTitle;
  document.documentElement.lang = 'en-NZ';
  document.body.className = bodyClass || '';

  upsertMeta('name', 'description', pageDescription);
  upsertMeta('name', 'keywords', SEO_KEYWORDS);
  upsertMeta(
    'name',
    'robots',
    robots || 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
  );
  upsertMeta('name', 'googlebot', 'index, follow');
  upsertMeta('name', 'author', `${SITE_OWNER}, ${SITE_NAME}`);
  upsertMeta('name', 'creator', SITE_OWNER);
  upsertMeta('name', 'publisher', SITE_NAME);
  upsertMeta('name', 'theme-color', '#0b1f3a');
  upsertMeta('name', 'format-detection', 'telephone=no');

  // Geo / locality for NZ search attribution
  upsertMeta('name', 'geo.region', SEO_GEO_REGION);
  upsertMeta('name', 'geo.placename', SEO_GEO_PLACENAME);
  upsertMeta('name', 'geo.position', `${SEO_GEO_POSITION.lat};${SEO_GEO_POSITION.lng}`);
  upsertMeta('name', 'ICBM', `${SEO_GEO_POSITION.lat}, ${SEO_GEO_POSITION.lng}`);

  // Optional Search Console verification (set VITE_GOOGLE_SITE_VERIFICATION in CI / .env)
  const gsc = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION?.trim();
  if (gsc) {
    upsertMeta('name', 'google-site-verification', gsc);
  }

  upsertLink('canonical', pageUrl);

  // Open Graph
  upsertMeta('property', 'og:type', ogType || 'website');
  upsertMeta('property', 'og:site_name', SITE_NAME);
  upsertMeta('property', 'og:locale', SEO_LOCALE);
  upsertMeta('property', 'og:title', pageTitle);
  upsertMeta('property', 'og:description', pageDescription);
  upsertMeta('property', 'og:url', pageUrl);
  upsertMeta('property', 'og:image', ogImageUrl);
  upsertMeta('property', 'og:image:secure_url', ogImageUrl);
  upsertMeta('property', 'og:image:alt', ogAlt);
  upsertMeta('property', 'og:image:type', ogImagePath.endsWith('.png') ? 'image/png' : 'image/jpeg');

  // Twitter / X
  upsertMeta('name', 'twitter:card', 'summary_large_image');
  upsertMeta('name', 'twitter:title', pageTitle);
  upsertMeta('name', 'twitter:description', pageDescription);
  upsertMeta('name', 'twitter:image', ogImageUrl);
  upsertMeta('name', 'twitter:image:alt', ogAlt);

  // JSON-LD: business graph once + page entity
  upsertJsonLd('jsonld-business', buildJsonLd(siteUrl));
  upsertJsonLd(
    'jsonld-webpage',
    buildWebPageJsonLd({
      title: pageTitle,
      description: pageDescription,
      path,
      image: ogImagePath,
      siteUrl,
    })
  );
}

export default function Seo(props: SeoProps) {
  // Sync during render so post-build prerender captures tags in static HTML
  applySeo(props);

  useEffect(() => {
    applySeo(props);
  }, [
    props.title,
    props.description,
    props.path,
    props.bodyClass,
    props.image,
    props.imageAlt,
    props.robots,
    props.ogType,
  ]);

  return null;
}
