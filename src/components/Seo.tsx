import { useEffect } from 'react';
import { SITE_NAME } from '../data/siteConfig';

interface SeoProps {
  title: string;
  description: string;
  path: string;
  bodyClass?: string;
  image?: string;
}

function siteOrigin(): string {
  return (import.meta.env.VITE_SITE_URL || window.location.origin).replace(/\/$/, '');
}

function absoluteFromSite(pathOrUrl: string): string {
  if (pathOrUrl.startsWith('http')) return pathOrUrl;
  const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  return `${siteOrigin()}${path}`;
}

function applySeo(
  title: string,
  description: string,
  path: string,
  bodyClass?: string,
  image?: string
) {
  if (typeof document === 'undefined') return;

  document.title = title;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute('content', description);
  document.body.className = bodyClass || '';

  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = absoluteFromSite(path === '/' ? '/' : path);

  const setOg = (property: string, content: string) => {
    let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('property', property);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  setOg('og:title', title);
  setOg('og:description', description);
  setOg('og:url', canonical.href);
  setOg('og:site_name', SITE_NAME);
  if (image) setOg('og:image', absoluteFromSite(image));
}

export default function Seo({ title, description, path, bodyClass, image }: SeoProps) {
  applySeo(title, description, path, bodyClass, image);

  useEffect(() => {
    applySeo(title, description, path, bodyClass, image);
  }, [title, description, path, bodyClass, image]);

  return null;
}
