interface BookingConfirmationDetailsProps {
  packageLabel: string;
  priceLabel: string;
  slotLabel: string;
  guestCount: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  live: boolean;
}

export default function BookingConfirmationDetails({
  packageLabel,
  priceLabel,
  slotLabel,
  guestCount,
  name,
  phone,
  email,
  message,
  live,
}: BookingConfirmationDetailsProps) {
  return (
    <div className="booking-confirm">
      <h2>Request received</h2>
      <p>
        {live
          ? 'Thanks — Tom will confirm your sail, final pricing, and arrange payment directly. Listed prices were estimates only.'
          : 'Thanks — your booking request has been sent as an enquiry. Availability shown here is illustrative, and listed prices are estimates (TBA / confirmed upon enquiry). Tom will follow up to confirm details.'}
      </p>
      <dl className="confirm-dl">
        <div>
          <dt>Package</dt>
          <dd>
            {packageLabel} — {priceLabel}
          </dd>
        </div>
        <div>
          <dt>When</dt>
          <dd>{slotLabel}</dd>
        </div>
        <div>
          <dt>Guests</dt>
          <dd>{guestCount}</dd>
        </div>
        <div>
          <dt>Name</dt>
          <dd>{name}</dd>
        </div>
        <div>
          <dt>Phone</dt>
          <dd>{phone}</dd>
        </div>
        {email && (
          <div>
            <dt>Email</dt>
            <dd>{email}</dd>
          </div>
        )}
        {message && (
          <div>
            <dt>Notes</dt>
            <dd>{message}</dd>
          </div>
        )}
      </dl>
    </div>
  );
}
