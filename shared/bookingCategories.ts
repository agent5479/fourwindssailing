/** Charter package categories for Four Winds Sailing. */

export type BookingCategoryId = 'charter';

export interface BookingCategoryConfig {
  id: BookingCategoryId;
  label: string;
}

export const BOOKING_CATEGORIES: Record<BookingCategoryId, BookingCategoryConfig> = {
  charter: { id: 'charter', label: 'Private charter' },
};

export function isBookingCategoryId(value: string): value is BookingCategoryId {
  return value === 'charter';
}
