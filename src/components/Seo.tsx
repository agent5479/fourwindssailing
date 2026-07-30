import { useEffect } from 'react';
import { SITE_NAME } from '../data/siteConfig';

interface SeoProps {
  title: string;
  description: string;
  path: string;
  bodyClass?: string;
  image?: string;
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
  const origin = import.meta.env.VITE_SITE_URL?.replace(/\/$/, '') || window.location.origin;
  canonical.href = `${origin}${path === '/' ? '/' : path}`;

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
  if (image) {
    const imgUrl = image.startsWith('http') ? image : `${origin}${image}`;
    setOg('og:image', imgUrl);
  }
}

export default function Seo({ title, description, path, bodyClass, image }: SeoProps) {
  applySeo(title, description, path, bodyClass, image);

  useEffect(() => {
    applySeo(title, description, path, bodyClass, image);
  }, [title, description, path, bodyClass, image]);

  return null;
}
