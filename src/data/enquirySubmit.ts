import { SITE_EMAIL } from './siteConfig';
import { FORM_ENDPOINT, HAS_LIVE_BOOKING } from './formConfig';

export interface EnquiryPayload {
  name: string;
  email: string;
  phone?: string;
  topic: string;
  message: string;
  subject?: string;
}

export type EnquiryResult =
  | { ok: true; method: 'endpoint' | 'formsubmit' | 'mailto' }
  | { ok: false; error: string };

function buildMailto(payload: EnquiryPayload): string {
  const subject = encodeURIComponent(
    payload.subject || `Four Winds enquiry — ${payload.topic}`
  );
  const body = encodeURIComponent(
    [
      `Name: ${payload.name}`,
      `Phone: ${payload.phone || ''}`,
      `Email: ${payload.email}`,
      `Topic: ${payload.topic}`,
      '',
      payload.message,
    ].join('\n')
  );
  return `mailto:${SITE_EMAIL}?subject=${subject}&body=${body}`;
}

async function submitViaEndpoint(payload: EnquiryPayload): Promise<boolean> {
  const response = await fetch(FORM_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({
      action: 'enquiry',
      name: payload.name.trim(),
      email: payload.email.trim(),
      phone: (payload.phone || '').trim(),
      topic: payload.topic,
      message: payload.message.trim(),
      website: '',
    }),
  });
  const data = (await response.json()) as { success?: boolean; message?: string };
  return response.ok && data.success !== false;
}

/** FormSubmit delivers without a mail client; first use needs Tom to confirm the activation email. */
async function submitViaFormSubmit(payload: EnquiryPayload): Promise<boolean> {
  const response = await fetch(`https://formsubmit.co/ajax/${SITE_EMAIL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name: payload.name.trim(),
      email: payload.email.trim(),
      phone: (payload.phone || '').trim(),
      topic: payload.topic,
      message: payload.message.trim(),
      _subject: payload.subject || `Four Winds enquiry — ${payload.topic}`,
      _template: 'table',
      _captcha: 'false',
    }),
  });
  if (!response.ok) return false;
  const data = (await response.json()) as { success?: string | boolean };
  return data.success === true || data.success === 'true';
}

/**
 * Prefer the live booking endpoint (if configured), then FormSubmit to SITE_EMAIL,
 * then mailto as a last resort so the user can still reach Tom.
 */
export async function submitEnquiry(payload: EnquiryPayload): Promise<EnquiryResult> {
  if (HAS_LIVE_BOOKING) {
    try {
      if (await submitViaEndpoint(payload)) {
        return { ok: true, method: 'endpoint' };
      }
    } catch {
      /* fall through */
    }
  }

  try {
    if (await submitViaFormSubmit(payload)) {
      return { ok: true, method: 'formsubmit' };
    }
  } catch {
    /* fall through to mailto */
  }

  window.location.href = buildMailto(payload);
  return { ok: true, method: 'mailto' };
}
