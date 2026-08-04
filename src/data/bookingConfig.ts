import type { DurationPackage } from '@shared/bookingServiceTypes';

export const NOTIFY_EMAIL = 'thomas.billingham@gmail.com';

export const DURATION_LABELS: Record<DurationPackage, string> = {
  short: 'Short sail (~2.5 hours)',
  half_day: 'Half day (4 hours)',
  full_day: 'Full day (8 hours)',
  intro: 'Intro to sailing (~2.5 hours)',
  custom: 'Custom / overnight',
};

export const BOOKING_POLICY =
  'Charter bookings are requests until Tom confirms. Price to be announced. Payment is arranged directly — online payment is not processed through this form. Sailings are weather-dependent and may be rescheduled for safety.';

export const BOOKING_PREP =
  'Bring layered clothing, sun protection, and soft-soled shoes. BYO picnic and drinks welcome. Max guests are listed per package — please note numbers in your booking.';

export interface BookingSlot {
  start: string;
  end: string;
  label: string;
}

export interface AvailabilityResult {
  success: boolean;
  category?: string;
  slots?: BookingSlot[];
  message?: string;
}

export function defaultBookingDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 2);
  return formatIsoDate(d);
}

export function minBookingDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return formatIsoDate(d);
}

export function maxBookingDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 90);
  return formatIsoDate(d);
}

export function formatIsoDate(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function formatDisplayDate(isoDate: string): string {
  const [y, m, d] = isoDate.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString('en-NZ', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function getQuickDateOptions(count = 5): { value: string; label: string }[] {
  const options: { value: string; label: string }[] = [];
  const start = new Date();
  start.setDate(start.getDate() + 2);
  for (let i = 0; i < count; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const value = formatIsoDate(d);
    options.push({ value, label: formatDisplayDate(value) });
  }
  return options;
}

/** Local mock availability when VITE_FORM_ENDPOINT is unset. */
export function mockAvailability(
  date: string,
  sessionMinutes: number
): AvailabilityResult {
  const [y, m, d] = date.split('-').map(Number);
  const day = new Date(y, m - 1, d).getDay();
  // No Sunday mock slots — nudges users to try another day
  if (day === 0) {
    return {
      success: true,
      slots: [],
      message: 'No sample slots on Sundays — try another day (illustrative availability).',
    };
  }

  const starts = sessionMinutes >= 400 ? [9] : sessionMinutes >= 200 ? [9, 13] : [9, 11, 14];
  const slots: BookingSlot[] = starts.map((hour) => {
    const start = new Date(y, m - 1, d, hour, 0, 0);
    const end = new Date(start.getTime() + sessionMinutes * 60 * 1000);
    const fmt = (dt: Date) =>
      dt.toLocaleTimeString('en-NZ', { hour: 'numeric', minute: '2-digit' });
    return {
      start: start.toISOString(),
      end: end.toISOString(),
      label: `${formatDisplayDate(date)}, ${fmt(start)} – ${fmt(end)}`,
    };
  });

  return { success: true, category: 'charter', slots };
}
