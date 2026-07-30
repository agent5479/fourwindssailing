export interface CharterPackageOption {
  id: string;
  label: string;
  description: string;
  bookingType: 'short_sail' | 'half_day' | 'full_day' | 'intro_sailing' | 'custom_charter';
  sessionMinutes: number;
  priceLabel: string;
}

export const BOOKING_PACKAGES: CharterPackageOption[] = [
  {
    id: 'short-sail',
    label: 'Short bay sail',
    description: '~2.5 hours exploring Golden Bay under sail.',
    bookingType: 'short_sail',
    sessionMinutes: 150,
    priceLabel: 'From $420 (mock)',
  },
  {
    id: 'half-day',
    label: 'Half-day charter',
    description: '4 hours — morning or afternoon on the bay.',
    bookingType: 'half_day',
    sessionMinutes: 240,
    priceLabel: 'From $650 (mock)',
  },
  {
    id: 'full-day',
    label: 'Full-day charter',
    description: '8 hours of coast exploration and island time.',
    bookingType: 'full_day',
    sessionMinutes: 480,
    priceLabel: 'From $980 (mock)',
  },
  {
    id: 'intro-sailing',
    label: 'Intro to sailing',
    description: '~2.5 hours learning the basics on Tom’s yacht.',
    bookingType: 'intro_sailing',
    sessionMinutes: 150,
    priceLabel: 'From $480 (mock)',
  },
  {
    id: 'custom-charter',
    label: 'Custom / overnight',
    description: 'Bespoke route or overnight — Tom will confirm details.',
    bookingType: 'custom_charter',
    sessionMinutes: 480,
    priceLabel: 'Enquire',
  },
];

export function getPackageById(id: string): CharterPackageOption | undefined {
  return BOOKING_PACKAGES.find((p) => p.id === id);
}
