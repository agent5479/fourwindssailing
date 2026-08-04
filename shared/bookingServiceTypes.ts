/** Charter packages × duration — Four Winds Sailing booking types. */

export type BookingServiceType =
  | 'short_sail'
  | 'half_day'
  | 'full_day'
  | 'intro_sailing'
  | 'custom_charter';

export type DurationPackage = 'short' | 'half_day' | 'full_day' | 'intro' | 'custom';

export interface BookingServiceTypeConfig {
  id: BookingServiceType;
  label: string;
  headline: string;
  packageId: string;
  locationLabel: string;
  category: 'charter';
  durationPackage: DurationPackage;
  sessionMinutes: number;
  calendarBlockMinutes: number;
  priceLabel: string;
}

export const BOOKING_SERVICE_TYPES: Record<BookingServiceType, BookingServiceTypeConfig> = {
  short_sail: {
    id: 'short_sail',
    label: 'Short sail — ~2.5 hours',
    headline: 'Short Golden Bay sail',
    packageId: 'short-sail',
    locationLabel: 'Golden Bay',
    category: 'charter',
    durationPackage: 'short',
    sessionMinutes: 150,
    calendarBlockMinutes: 150,
    priceLabel: 'From $420 (estimate)',
  },
  half_day: {
    id: 'half_day',
    label: 'Half day — 4 hours',
    headline: 'Half-day private charter',
    packageId: 'half-day',
    locationLabel: 'Golden Bay',
    category: 'charter',
    durationPackage: 'half_day',
    sessionMinutes: 240,
    calendarBlockMinutes: 240,
    priceLabel: 'From $650 (estimate)',
  },
  full_day: {
    id: 'full_day',
    label: 'Full day — 8 hours',
    headline: 'Full-day private charter',
    packageId: 'full-day',
    locationLabel: 'Golden Bay',
    category: 'charter',
    durationPackage: 'full_day',
    sessionMinutes: 480,
    calendarBlockMinutes: 480,
    priceLabel: 'From $980 (estimate)',
  },
  intro_sailing: {
    id: 'intro_sailing',
    label: 'Intro to sailing — ~2.5 hours',
    headline: 'Learn to sail intro',
    packageId: 'intro-sailing',
    locationLabel: 'Golden Bay',
    category: 'charter',
    durationPackage: 'intro',
    sessionMinutes: 150,
    calendarBlockMinutes: 150,
    priceLabel: 'From $480 (estimate)',
  },
  custom_charter: {
    id: 'custom_charter',
    label: 'Custom / overnight — enquire',
    headline: 'Custom or overnight charter',
    packageId: 'custom-charter',
    locationLabel: 'Golden Bay',
    category: 'charter',
    durationPackage: 'custom',
    sessionMinutes: 480,
    calendarBlockMinutes: 480,
    priceLabel: 'Price upon enquiry',
  },
};

export const BOOKING_SERVICE_TYPE_LIST: BookingServiceTypeConfig[] = Object.values(BOOKING_SERVICE_TYPES);

export function isBookingServiceType(value: string): value is BookingServiceType {
  return value in BOOKING_SERVICE_TYPES;
}

export function getBookingServiceTypeConfig(serviceType: BookingServiceType): BookingServiceTypeConfig {
  return BOOKING_SERVICE_TYPES[serviceType];
}

export function getServiceTypesForPackage(packageId: string): BookingServiceTypeConfig[] {
  return BOOKING_SERVICE_TYPE_LIST.filter((t) => t.packageId === packageId);
}
