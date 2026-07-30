export const SITE_NAME = 'Four Winds Sailing';
export const SITE_TAGLINE = 'Local waters. Trusted hands. Your boat — or mine.';
export const SITE_LOCATION = 'Golden Bay, New Zealand';
export const SITE_EMAIL = 'hello@fourwindssailing.nz';
export const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61590890969011';

export const SEO_DEFAULT_DESCRIPTION =
  'Skipper for hire & private sailing charters in Golden Bay, New Zealand — Four Winds Sailing, Tom Billingham. SRL & RYA Yachtmaster.';

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
