import { useEffect, useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PackagePicker from '../components/PackagePicker';
import BookingConfirmationDetails from '../components/BookingConfirmationDetails';
import { BOOKING_PACKAGES, getPackageById } from '../data/bookingPackages';
import {
  BOOKING_POLICY,
  BOOKING_PREP,
  defaultBookingDate,
  formatDisplayDate,
  getQuickDateOptions,
  maxBookingDate,
  minBookingDate,
  mockAvailability,
  type AvailabilityResult,
  type BookingSlot,
} from '../data/bookingConfig';
import { FORM_ENDPOINT, HAS_LIVE_BOOKING } from '../data/formConfig';
import { BOOKING_SERVICE_TYPES } from '@shared/bookingServiceTypes';

type WizardStep = 1 | 2 | 3 | 4;

export default function BookForm() {
  const [searchParams] = useSearchParams();
  const preset = searchParams.get('package');

  const [stepPackageDone, setStepPackageDone] = useState(false);
  const [stepDateTimeDone, setStepDateTimeDone] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [packageId, setPackageId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(defaultBookingDate());
  const [slots, setSlots] = useState<BookingSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<BookingSlot | null>(null);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotError, setSlotError] = useState('');

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [guestCount, setGuestCount] = useState('2');
  const [message, setMessage] = useState('');
  const [weatherAck, setWeatherAck] = useState(false);
  const [picnicAck, setPicnicAck] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const pkg = packageId ? getPackageById(packageId) : undefined;
  const serviceConfig = pkg ? BOOKING_SERVICE_TYPES[pkg.bookingType] : undefined;

  useEffect(() => {
    if (!preset) return;
    const match = BOOKING_PACKAGES.find((p) => p.id === preset);
    if (match) {
      setPackageId(match.id);
      setStepPackageDone(true);
    }
  }, [preset]);

  useEffect(() => {
    if (!stepPackageDone || !pkg || !serviceConfig) return;

    let cancelled = false;
    setLoadingSlots(true);
    setSlotError('');
    setSlots([]);
    setSelectedSlot(null);
    setStepDateTimeDone(false);

    const load = async () => {
      try {
        if (HAS_LIVE_BOOKING) {
          const response = await fetch(FORM_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify({
              action: 'availability',
              date: selectedDate,
              booking_type: pkg.bookingType,
              location: 'Golden Bay',
              category: 'charter',
            }),
          });
          const data = (await response.json()) as AvailabilityResult;
          if (cancelled) return;
          if (!data.success) {
            setSlotError(data.message || 'Could not load availability.');
            return;
          }
          setSlots(data.slots || []);
          if (!data.slots?.length) {
            setSlotError(data.message || 'No slots available on this date. Try another day.');
          }
        } else {
          const data = mockAvailability(selectedDate, pkg.sessionMinutes);
          if (cancelled) return;
          setSlots(data.slots || []);
          if (!data.slots?.length) {
            setSlotError(data.message || 'No slots available on this date. Try another day.');
          }
        }
      } catch {
        if (!cancelled) setSlotError('Could not load availability. Please try again.');
      } finally {
        if (!cancelled) setLoadingSlots(false);
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, [stepPackageDone, pkg, serviceConfig, selectedDate]);

  function selectPackage(id: string) {
    setPackageId(id);
    setStepPackageDone(true);
    setStepDateTimeDone(false);
    setSelectedSlot(null);
  }

  function selectSlot(slot: BookingSlot) {
    setSelectedSlot(slot);
    setStepDateTimeDone(true);
  }

  function currentStep(): WizardStep {
    if (submitted) return 4;
    if (!stepPackageDone) return 1;
    if (!stepDateTimeDone) return 2;
    return 3;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!pkg || !serviceConfig || !selectedSlot) return;
    if (!phone.trim()) {
      setSubmitError('Phone is required.');
      return;
    }
    if (!name.trim()) {
      setSubmitError('Please provide your name.');
      return;
    }
    if (!weatherAck) {
      setSubmitError('Please acknowledge weather-dependent sailing.');
      return;
    }

    setSubmitting(true);
    setSubmitError('');

    const payload = {
      action: 'book',
      booking_type: pkg.bookingType,
      location: 'Golden Bay',
      category: 'charter',
      slot_start: selectedSlot.start,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      organisation: '',
      message: [
        `Guests: ${guestCount}`,
        picnicAck ? 'BYO picnic noted' : '',
        message.trim(),
      ]
        .filter(Boolean)
        .join('\n'),
      website: '',
    };

    try {
      if (HAS_LIVE_BOOKING) {
        const response = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload),
        });
        const data = (await response.json()) as { success?: boolean; message?: string };
        if (!response.ok || !data.success) {
          setSubmitError(data.message || 'Booking failed. Please try again.');
          return;
        }
      }
      // Mock mode: accept locally
      setSubmitted(true);
    } catch {
      setSubmitError('Booking failed. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted && pkg && selectedSlot) {
    return (
      <BookingConfirmationDetails
        packageLabel={pkg.label}
        priceLabel={pkg.priceLabel}
        slotLabel={selectedSlot.label}
        guestCount={guestCount}
        name={name}
        phone={phone}
        email={email}
        message={message}
        live={HAS_LIVE_BOOKING}
      />
    );
  }

  const step = currentStep();

  return (
    <form className="book-form" onSubmit={handleSubmit} noValidate>
      <p className="book-form__policy">{BOOKING_POLICY}</p>
      <p className="book-form__prep">{BOOKING_PREP}</p>
      {!HAS_LIVE_BOOKING && (
        <p className="book-form__demo">
          Demo mode: availability is mocked locally. Connect <code>VITE_FORM_ENDPOINT</code> for live
          bookings.
        </p>
      )}

      <section className="book-step" aria-current={step === 1 ? 'step' : undefined}>
        <h2>Step 1 — Choose a charter package</h2>
        <PackagePicker
          packages={BOOKING_PACKAGES}
          selectedId={packageId}
          onSelect={selectPackage}
        />
      </section>

      {stepPackageDone && pkg && (
        <section className="book-step" aria-current={step === 2 ? 'step' : undefined}>
          <h2>Step 2 — Pick date and time</h2>
          <label className="field">
            <span>Date</span>
            <input
              type="date"
              value={selectedDate}
              min={minBookingDate()}
              max={maxBookingDate()}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setSelectedSlot(null);
                setStepDateTimeDone(false);
              }}
            />
          </label>
          <div className="quick-dates">
            {getQuickDateOptions(5).map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`quick-date${selectedDate === opt.value ? ' quick-date--selected' : ''}`}
                onClick={() => {
                  setSelectedDate(opt.value);
                  setSelectedSlot(null);
                  setStepDateTimeDone(false);
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {loadingSlots && <p className="status">Loading available times…</p>}
          {slotError && <p className="error">{slotError}</p>}
          {!loadingSlots && slots.length > 0 && (
            <div className="slot-grid">
              {slots.map((slot) => (
                <button
                  key={slot.start}
                  type="button"
                  className={`slot-btn${selectedSlot?.start === slot.start ? ' slot-btn--selected' : ''}`}
                  onClick={() => selectSlot(slot)}
                >
                  {slot.label.split(', ').slice(1).join(', ') || slot.label}
                </button>
              ))}
            </div>
          )}
          {selectedSlot && (
            <p className="selected-slot">
              Selected: <strong>{formatDisplayDate(selectedDate)}</strong> — {selectedSlot.label}
            </p>
          )}
        </section>
      )}

      {stepDateTimeDone && (
        <section className="book-step" aria-current={step === 3 ? 'step' : undefined}>
          <h2>Step 3 — Your details</h2>
          <label className="field">
            <span>Name *</span>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              required
            />
          </label>
          <label className="field">
            <span>Phone *</span>
            <input
              type="tel"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              autoComplete="tel"
            />
          </label>
          <label className="field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </label>
          <label className="field">
            <span>Number of guests (max 4)</span>
            <select value={guestCount} onChange={(e) => setGuestCount(e.target.value)}>
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={String(n)}>
                  {n}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Notes / picnic / special requests</span>
            <textarea
              name="message"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>
          <label className="checkbox-field">
            <input
              type="checkbox"
              checked={weatherAck}
              onChange={(e) => setWeatherAck(e.target.checked)}
              required
            />
            I understand sailings are weather-dependent and may be rescheduled for safety
          </label>
          <label className="checkbox-field">
            <input
              type="checkbox"
              checked={picnicAck}
              onChange={(e) => setPicnicAck(e.target.checked)}
            />
            We plan to BYO picnic / drinks
          </label>

          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="hp-field"
            aria-hidden="true"
          />

          {submitError && <p className="error">{submitError}</p>}

          <button type="submit" className="btn btn--gold" disabled={submitting || !selectedSlot}>
            {submitting ? 'Sending…' : 'Request booking'}
          </button>
        </section>
      )}

      <p className="book-form__enquiry">
        Need a skipper on your own boat? <Link to="/contact">Send an enquiry</Link>
      </p>
    </form>
  );
}
