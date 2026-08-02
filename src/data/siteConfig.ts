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
  'Four Winds Sailing | Skipper for Hire & Private Charters — Golden Bay NZ';

export const SEO_DEFAULT_DESCRIPTION =
  'Hire SRL & RYA Yachtmaster skipper Tom Billingham in Golden Bay, New Zealand — relief skippering, coastal deliveries, and private sailing charters on his yacht.';

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
  'skipper for hire Golden Bay',
  'private sailing charter Golden Bay',
  'skippered yacht charter NZ',
  'Abel Tasman sailing',
  'Tākaka skipper',
  'SRL skipper New Zealand',
  'Maritime NZ Skipper Restricted Limits',
  'RYA Yachtmaster NZ',
  'trailer sailer charter',
  'intro to sailing Golden Bay',
  'boat delivery Golden Bay',
  'relief skipper Tasman',
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
    title: 'Skipper for Hire Golden Bay | Tom Billingham — Four Winds Sailing',
    description:
      'Hire Tom Billingham as your Golden Bay skipper. Maritime NZ SRL & RYA Yachtmaster — relief skippering, coastal deliveries, and owner days out in Tasman, New Zealand.',
    keywords: joinKeywords(SEO_CORE_KEYWORDS, [
      'skipper for hire Golden Bay',
      'hire a skipper New Zealand',
      'relief skipper Tasman',
      'coastal vessel delivery NZ',
      'boat delivery Golden Bay',
      'owner days out sailing',
      'SRL skipper New Zealand',
      'Maritime NZ Skipper Restricted Limits',
      'RYA Yachtmaster NZ',
      'Tākaka skipper',
    ]),
  },
  charters: {
    title: 'Private Sailing Charters Golden Bay | Four Winds Sailing',
    description:
      'Private skippered sailing charters in Golden Bay, NZ — short bay sails, half-day, full-day, and intro to sailing with SRL skipper Tom Billingham.',
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
    title: 'About Tom Billingham | SRL & RYA Yachtmaster — Four Winds Sailing',
    description:
      'Meet Tom Billingham of Four Winds Sailing — Golden Bay skipper with Maritime NZ Skipper Restricted Limits (SRL) and RYA Yachtmaster qualifications.',
    keywords: joinKeywords(SEO_CORE_KEYWORDS, [
      'Tom Billingham skipper',
      'Four Winds Sailing about',
      'SRL skipper New Zealand',
      'Maritime NZ Skipper Restricted Limits',
      'RYA Yachtmaster NZ',
      'Golden Bay sailing skipper',
      'qualified yacht skipper Tasman',
    ]),
  },
  contact: {
    title: 'Contact Four Winds Sailing | Skipper Hire & Charters Golden Bay',
    description: `Contact Tom Billingham at Four Winds Sailing — skipper hire or private charter enquiries in Golden Bay, Tasman, New Zealand. Email ${SITE_EMAIL}.`,
    keywords: joinKeywords(SEO_CORE_KEYWORDS, [
      'contact Four Winds Sailing',
      'skipper hire enquiry Golden Bay',
      'sailing charter enquiry NZ',
      'email Golden Bay skipper',
      'book skipper Tasman',
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
  { label: 'Skipper Hire', to: '/skipper' },
  { label: 'Charters', to: '/charters' },
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
    label: 'RYA Yachtmaster',
    issuer: 'Royal Yachting Association',
    confirmed: true,
  },
] as const;

/** Sample experience bullets — replace when Tom’s full CV arrives. */
export const SAMPLE_EXPERIENCE = [
  'Local Golden Bay coastal knowledge — tides, weather windows, quiet anchorages (sample)',
  'Relief and day skippering for private boat owners (sample)',
  'Intro sailing coaching for families and first-timers (sample)',
  'Coastal hops and vessel handovers across Tasman waters (sample)',
];

export const TESTIMONIALS = [
  {
    quote:
      'Tom put us at ease from the first line ashore. Calm, capable, and clearly loves these waters — we felt in safe hands the whole afternoon.',
    name: 'Sample guest',
    note: 'Placeholder until real reviews arrive',
  },
  {
    quote:
      'Exactly what we needed: a local skipper who treated our boat with care and knew where the wind would fill in. We’ll call him again.',
    name: 'Sample boat owner',
    note: 'Placeholder until real reviews arrive',
  },
];
