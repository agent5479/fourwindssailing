export interface CharterPackage {
  id: string;
  title: string;
  duration: string;
  blurb: string;
  priceFrom: string;
  maxGuests: number;
  image: string;
  bookingType: 'short_sail' | 'half_day' | 'full_day' | 'intro_sailing' | 'custom_charter';
  enquireOnly?: boolean;
}

export const CHARTER_PACKAGES: CharterPackage[] = [
  {
    id: 'short-sail',
    title: 'Short bay sail',
    duration: '~2.5 hours',
    blurb:
      'A taste of Golden Bay under sail — slip the marina, feel the breeze, and see the coast from the water. Perfect for families with limited time.',
    priceFrom: 'Price to be announced',
    maxGuests: 4,
    image: '/images/yacht2.jpg',
    bookingType: 'short_sail',
  },
  {
    id: 'half-day',
    title: 'Half-day charter',
    duration: '4 hours',
    blurb:
      'Morning or afternoon on the bay — explore inlets, drop the hook for a swim or picnic, and set your own pace with Tom at the helm.',
    priceFrom: 'Price to be announced',
    maxGuests: 4,
    image: '/images/Yacht.jpg',
    bookingType: 'half_day',
  },
  {
    id: 'full-day',
    title: 'Full-day charter',
    duration: '8 hours',
    blurb:
      'A full day of Golden Bay sailing — remote beaches, coast exploration, and time to linger. Your day, your way under sail.',
    priceFrom: 'Price to be announced',
    maxGuests: 4,
    image: '/images/stock/half-day.jpg',
    bookingType: 'full_day',
  },
  {
    id: 'intro-sailing',
    title: 'Intro to sailing',
    duration: '~2.5 hours',
    blurb:
      'Learn the basics on Tom’s yacht — parts of the boat, points of sail, helm time, and a few knots. Fun, clear teaching in a beautiful classroom.',
    priceFrom: 'Price to be announced',
    maxGuests: 4,
    image: '/images/familyatsea.jpg',
    bookingType: 'intro_sailing',
  },
  {
    id: 'custom-charter',
    title: 'Custom & overnight',
    duration: 'Bespoke',
    blurb:
      'Overnight or multi-day ideas, special occasions, or a route you have in mind. Tell Tom what you’re after and he’ll shape a plan around weather and tides.',
    priceFrom: 'Price to be announced',
    maxGuests: 4,
    image: '/images/yachttransport.png',
    bookingType: 'custom_charter',
    enquireOnly: true,
  },
];

export const SKIPPER_SERVICES = [
  {
    title: 'Offshore Deliveries',
    body: 'Need a skipper for a long distance passage? These passages can be intimidating for the uninitiated, Tom provides a steady, experienced hand at the helm. Familiar with a variety of boat systems, he can move your vessel for you or join you in any aspect of the voyage, be it a trip up to the islands, across the ditch or anywhere in the world!',
  },
  {
    title: 'Owner day with a pro',
    body: 'Sail your own boat with an SRL-qualified Yachtmaster alongside — build confidence, refine systems, or simply enjoy the day without the mental load.',
  },
  {
    title: 'Voyage prep & handover',
    body: 'Passage planning, safety brief, and a clear handover so you leave the dock knowing the plan.',
  },
];
