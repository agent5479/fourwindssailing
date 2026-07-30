import { useState, type FormEvent } from 'react';
import SiteLayout from '../components/SiteLayout';
import { FACEBOOK_URL, SITE_EMAIL, SITE_LOCATION } from '../data/siteConfig';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [topic, setTopic] = useState('skipper');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Four Winds enquiry — ${topic}`);
    const body = encodeURIComponent(
      `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nTopic: ${topic}\n\n${message}`
    );
    window.location.href = `mailto:${SITE_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <SiteLayout
      title="Contact | Four Winds Sailing — Golden Bay"
      description="Contact Tom Billingham at Four Winds Sailing for skipper hire or private charter enquiries in Golden Bay, New Zealand."
      path="/contact"
      bodyClass="page-contact"
      hero={
        <section className="page-hero">
          <div className="page-hero__inner">
            <p className="eyebrow">Contact</p>
            <h1>Get in touch</h1>
            <p>
              Skipper hire, charter questions, or just say kia ora — Tom will get back to you.
            </p>
          </div>
        </section>
      }
    >
      <section className="section">
        <div className="section__inner contact-grid">
          <div>
            <h2>Reach Tom</h2>
            <p>
              <strong>Email:</strong>{' '}
              <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>
            </p>
            <p>
              <strong>Phone:</strong> on request
            </p>
            <p>
              <strong>Location:</strong> {SITE_LOCATION}
            </p>
            <p>
              <strong>Facebook:</strong>{' '}
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">
                Four Winds Sailing on Facebook
              </a>
            </p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <h2>Send an enquiry</h2>
            {sent && (
              <p className="status">
                Your email client should open with the message ready — if not, email {SITE_EMAIL}{' '}
                directly.
              </p>
            )}
            <label className="field">
              <span>Name *</span>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            </label>
            <label className="field">
              <span>Email *</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </label>
            <label className="field">
              <span>Phone</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
              />
            </label>
            <label className="field">
              <span>Topic</span>
              <select value={topic} onChange={(e) => setTopic(e.target.value)}>
                <option value="skipper">Skipper for hire</option>
                <option value="charter">Private charter</option>
                <option value="intro">Intro to sailing</option>
                <option value="other">Other</option>
              </select>
            </label>
            <label className="field">
              <span>Message *</span>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </label>
            <button type="submit" className="btn btn--gold">
              Open email to Tom
            </button>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}
