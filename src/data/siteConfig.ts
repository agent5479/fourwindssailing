export const SITE_NAME = 'Four Winds Sailing';
export const SITE_LEGAL_NAME = 'Four Winds Sailing';
export const SITE_TAGLINE = 'Local waters. Trusted hands. Your boat — or mine.';
export const SITE_LOCATION = 'Golden Bay, New Zealand';
export const SITE_EMAIL = 'thomas.billingham@gmail.com';
export const SITE_OWNER = 'Tom Billingham';
export const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61590890969011';

/** Default / fallback when VITE_SITE_URL is unset (local). CI sets the live origin. */
export const SITE_URL_FALLBACK = 'https://fourwindssailing.nz';

export const SEO_DEFAULT_TITLE =
  'Four Winds Sailing | Private Charters & Skipper for Hire — Golden Bay NZ';

export const SEO_DEFAULT_DESCRIPTION =
  'Private skippered and bareboat charters on Bright Sparx in Golden Bay, New Zealand — plus domestic and international vessel deliveries with SRL & RYA Yachtmaster Offshore skipper Tom Billingham.';

/** Shared brand + locality terms included on every page. */
const SEO_CORE_KEYWORDS = [
  'Four Winds Sailing',
  'Tom Billingham',
  'Golden Bay',
  'Tasman New Zealand',
  'Tākaka',
] as const;

function joinKeywords(...groups: ReadonlyArray<ReadonlyArray<string>>): string {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const group of groups) {
    for (const term of group) {
      const key = term.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(term);
    }
  }
  return out.join(', ');
}

/** Homepage / site-wide default keywords (also used in index.html). */
export const SEO_KEYWORDS = joinKeywords(SEO_CORE_KEYWORDS, [
  'private sailing charter Golden Bay',
  'skippered yacht charter NZ',
  'Abel Tasman sailing',
  'trailer sailer charter',
  'intro to sailing Golden Bay',
  'family sailing charter NZ',
  'skipper for hire Golden Bay',
  'boat delivery Golden Bay',
  'coastal vessel delivery NZ',
  'relief skipper Tasman',
  'Tākaka skipper',
  'SRL skipper New Zealand',
  'Maritime NZ Skipper Restricted Limits',
  'RYA Yachtmaster Offshore NZ',
]);

export interface PageSeo {
  title: string;
  description: string;
  keywords: string;
}

/** Per-route title, description, and keyword sets tuned to search intent. */
export const PAGE_SEO: Record<string, PageSeo> = {
  home: {
    title: SEO_DEFAULT_TITLE,
    description: SEO_DEFAULT_DESCRIPTION,
    keywords: SEO_KEYWORDS,
  },
  skipper: {
    title: 'Delivery Skipper | Vessel Deliveries — Four Winds Sailing',
    description:
      'Domestic and international vessel deliveries with Tom Billingham — over 25,000 NM experience, SRL & RYA Yachtmaster Offshore qualified. Golden Bay and worldwide routes considered.',
    keywords: joinKeywords(SEO_CORE_KEYWORDS, [
      'skipper for hire Golden Bay',
      'hire a skipper New Zealand',
      'relief skipper Tasman',
      'coastal vessel delivery NZ',
      'boat delivery Golden Bay',
      'owner days out sailing',
      'SRL skipper New Zealand',
      'Maritime NZ Skipper Restricted Limits',
      'RYA Yachtmaster Offshore NZ',
      'Tākaka skipper',
    ]),
  },
  charters: {
    title: 'Private Sailing Charters Golden Bay | Bright Sparx — Four Winds Sailing',
    description:
      'Skippered and bareboat charters on our Noelex 25, Bright Sparx — cruise Golden Bay with the option to sail into Abel Tasman National Park.',
    keywords: joinKeywords(SEO_CORE_KEYWORDS, [
      'private sailing charter Golden Bay',
      'skippered yacht charter NZ',
      'day sail Golden Bay',
      'half day sailing charter',
      'full day sailing charter',
      'intro to sailing Golden Bay',
      'Abel Tasman sailing',
      'trailer sailer charter',
      'family sailing charter NZ',
    ]),
  },
  book: {
    title: 'Book a Sailing Charter Golden Bay | Four Winds Sailing',
    description:
      'Request a private sailing charter in Golden Bay with Tom Billingham — short sails, half-day, full-day, or intro to sailing. Weather-dependent; confirm directly.',
    keywords: joinKeywords(SEO_CORE_KEYWORDS, [
      'book sailing charter Golden Bay',
      'private sailing charter enquiry',
      'book a day sail NZ',
      'intro to sailing booking',
      'skippered charter Golden Bay',
      'yacht charter request Tasman',
    ]),
  },
  about: {
    title: 'About Tom Billingham | SRL & RYA Yachtmaster Offshore — Four Winds Sailing',
    description:
      'Meet Tom Billingham of Four Winds Sailing — Golden Bay skipper with Maritime NZ Skipper Restricted Limits (SRL) and RYA Yachtmaster Offshore qualifications.',
    keywords: joinKeywords(SEO_CORE_KEYWORDS, [
      'Tom Billingham skipper',
      'Four Winds Sailing about',
      'SRL skipper New Zealand',
      'Maritime NZ Skipper Restricted Limits',
      'RYA Yachtmaster Offshore NZ',
      'Golden Bay sailing skipper',
      'qualified yacht skipper Tasman',
    ]),
  },
  contact: {
    title: 'Contact Four Winds Sailing | Charters & Deliveries Golden Bay',
    description: `Contact Tom Billingham at Four Winds Sailing — private charter or vessel delivery enquiries in Golden Bay, Tasman, New Zealand. Email ${SITE_EMAIL}.`,
    keywords: joinKeywords(SEO_CORE_KEYWORDS, [
      'contact Four Winds Sailing',
      'sailing charter enquiry NZ',
      'book sailing charter Golden Bay',
      'vessel delivery enquiry',
      'skipper hire enquiry Golden Bay',
      'email Golden Bay skipper',
    ]),
  },
};

export const SEO_LOCALE = 'en_NZ';
export const SEO_GEO_REGION = 'NZ-TAS';
export const SEO_GEO_PLACENAME = 'Golden Bay, Tasman, New Zealand';
/** Approximate Tākaka / Golden Bay centre for geo meta & schema */
export const SEO_GEO_POSITION = { lat: -40.855, lng: 172.808 };

export const SEO_OG_IMAGE = '/images/yacht2.jpg';
export const SEO_OG_IMAGE_ALT = 'Four Winds Sailing yacht under sail — Golden Bay, New Zealand';
export const SEO_LOGO = '/images/logo.png';

export interface NavLink {
  label: string;
  to: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Charters', to: '/charters' },
  { label: 'Deliveries', to: '/skipper' },
  { label: 'About', to: '/about' },
  { label: 'Book', to: '/book' },
  { label: 'Contact', to: '/contact' },
];

export const CREDENTIALS = [
  {
    id: 'srl',
    label: 'Skipper Restricted Limits (SRL)',
    issuer: 'Maritime New Zealand',
    confirmed: true,
  },
  {
    id: 'rya',
    label: 'RYA Yachtmaster Offshore',
    issuer: 'Royal Yachting Association',
    confirmed: true,
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      'Alabama is completed with your efforts and sweat (including the cold). You (Tom) are the true master of the Alabama!',
    name: 'Windy Chon, Owner S/Y Alabama',
    caption: 'Vuda Marina, Fiji - Busan, South Korea - approx 5000NM',
    image: '/images/alabama-malecula.jpg',
    imageAlt: 'S/Y Alabama',
  },
];
