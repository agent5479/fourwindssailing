/** Optional live booking endpoint. Empty → local mock availability. */
export const FORM_ENDPOINT = (import.meta.env.VITE_FORM_ENDPOINT || '').trim();

export const HAS_LIVE_BOOKING = FORM_ENDPOINT.length > 0;
