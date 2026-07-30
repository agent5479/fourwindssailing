export const SITE_NAME = 'Four Winds Sailing';
export const SITE_LEGAL_NAME = 'Four Winds Sailing';
export const SITE_TAGLINE = 'Local waters. Trusted hands. Your boat — or mine.';
export const SITE_LOCATION = 'Golden Bay, New Zealand';
export const SITE_EMAIL = 'hello@fourwindssailing.nz';
export const SITE_OWNER = 'Tom Billingham';
export const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61590890969011';

/** Default / fallback when VITE_SITE_URL is unset (local). CI sets the live origin. */
export const SITE_URL_FALLBACK = 'https://agent5479.github.io/fourwindssailing';

export const SEO_DEFAULT_TITLE =
  'Four Winds Sailing | Skipper for Hire & Private Charters — Golden Bay NZ';

export const SEO_DEFAULT_DESCRIPTION =
  'Hire SRL & RYA Yachtmaster skipper Tom Billingham in Golden Bay, New Zealand — relief skippering, coastal deliveries, and private sailing charters on his yacht.';

export const SEO_KEYWORDS = [
  'Four Winds Sailing',
  'Tom Billingham',
  'skipper for hire Golden Bay',
  'private sailing charter Golden Bay',
  'Abel Tasman sailing',
  'Tākaka skipper',
  'SRL skipper New Zealand',
  'RYA Yachtmaster NZ',
  'trailer sailer charter',
  'intro to sailing Golden Bay',
].join(', ');

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
