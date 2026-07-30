import {
  FACEBOOK_URL,
  SEO_GEO_PLACENAME,
  SEO_GEO_POSITION,
  SEO_LOGO,
  SEO_OG_IMAGE,
  SITE_EMAIL,
  SITE_LEGAL_NAME,
  SITE_LOCATION,
  SITE_NAME,
  SITE_OWNER,
  SITE_TAGLINE,
  SITE_URL_FALLBACK,
} from './siteConfig';

export function getSiteUrl(): string {
  if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SITE_URL) {
    return String(import.meta.env.VITE_SITE_URL).replace(/\/$/, '');
  }
  return SITE_URL_FALLBACK;
}

export function absoluteUrl(pathOrUrl: string, siteUrl = getSiteUrl()): string {
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl;
  }
  const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  if (path === '/') return `${siteUrl}/`;
  return `${siteUrl}${path}`;
}

/** Organization + LocalBusiness + Person graph for Google Search / Business alignment. */
export function buildJsonLd(siteUrl = getSiteUrl()) {
  const logoUrl = absoluteUrl(SEO_LOGO, siteUrl);
  const imageUrl = absoluteUrl(SEO_OG_IMAGE, siteUrl);
  const personId = `${siteUrl}/#person`;
  const orgId = `${siteUrl}/#organization`;
  const businessId = `${siteUrl}/#localbusiness`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: SITE_NAME,
        description: SITE_TAGLINE,
        publisher: { '@id': orgId },
        inLanguage: 'en-NZ',
      },
      {
        '@type': 'Organization',
        '@id': orgId,
        name: SITE_LEGAL_NAME,
        url: `${siteUrl}/`,
        logo: {
          '@type': 'ImageObject',
          url: logoUrl,
        },
        email: SITE_EMAIL,
        sameAs: [FACEBOOK_URL],
        founder: { '@id': personId },
        areaServed: {
          '@type': 'AdministrativeArea',
          name: SITE_LOCATION,
        },
      },
      {
        '@type': ['LocalBusiness', 'SportsActivityLocation'],
        '@id': businessId,
        name: SITE_NAME,
        legalName: SITE_LEGAL_NAME,
        url: `${siteUrl}/`,
        image: [imageUrl, logoUrl],
        logo: logoUrl,
        email: SITE_EMAIL,
        description:
          'Skipper for hire and private sailing charters in Golden Bay, New Zealand. SRL and RYA Yachtmaster qualified.',
        slogan: SITE_TAGLINE,
        priceRange: '$$',
        currenciesAccepted: 'NZD',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Golden Bay',
          addressRegion: 'Tasman',
          addressCountry: 'NZ',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: SEO_GEO_POSITION.lat,
          longitude: SEO_GEO_POSITION.lng,
        },
        areaServed: [
          { '@type': 'AdministrativeArea', name: 'Golden Bay' },
          { '@type': 'AdministrativeArea', name: 'Tasman' },
          { '@type': 'Country', name: 'New Zealand' },
        ],
        knowsAbout: [
          'Skipper for hire',
          'Private sailing charter',
          'Relief skippering',
          'Coastal vessel delivery',
          'Intro to sailing',
          'Skipper Restricted Limits',
          'RYA Yachtmaster',
        ],
        sameAs: [FACEBOOK_URL],
        founder: { '@id': personId },
        employee: { '@id': personId },
        parentOrganization: { '@id': orgId },
      },
      {
        '@type': 'Person',
        '@id': personId,
        name: SITE_OWNER,
        jobTitle: 'Skipper',
        url: absoluteUrl('/about', siteUrl),
        image: absoluteUrl('/images/TomBillingham.jpg', siteUrl),
        worksFor: { '@id': orgId },
        email: SITE_EMAIL,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Golden Bay',
          addressRegion: 'Tasman',
          addressCountry: 'NZ',
        },
        knowsAbout: [
          'Maritime NZ Skipper Restricted Limits (SRL)',
          'RYA Yachtmaster',
          'Golden Bay sailing',
        ],
        sameAs: [FACEBOOK_URL],
      },
    ],
  };
}

export function buildWebPageJsonLd(opts: {
  title: string;
  description: string;
  path: string;
  image?: string;
  siteUrl?: string;
}) {
  const siteUrl = opts.siteUrl ?? getSiteUrl();
  const pageUrl = absoluteUrl(opts.path === '/' ? '/' : opts.path, siteUrl);
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: opts.title,
    description: opts.description,
    url: pageUrl,
    isPartOf: { '@id': `${siteUrl}/#website` },
    about: { '@id': `${siteUrl}/#localbusiness` },
    primaryImageOfPage: opts.image
      ? { '@type': 'ImageObject', url: absoluteUrl(opts.image, siteUrl) }
      : undefined,
    inLanguage: 'en-NZ',
  };
}

export { SEO_GEO_PLACENAME };
