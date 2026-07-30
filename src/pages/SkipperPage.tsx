import { Link } from 'react-router-dom';
import SiteLayout from '../components/SiteLayout';
import TrustChips from '../components/TrustChips';
import { SKIPPER_SERVICES } from '../data/charters';
import { FACEBOOK_URL, SITE_EMAIL } from '../data/siteConfig';

export default function SkipperPage() {
  return (
    <SiteLayout
      title="Skipper for Hire | Four Winds Sailing — Golden Bay"
      description="Hire Tom Billingham as your Golden Bay skipper. Maritime NZ SRL & RYA Yachtmaster — relief skippering, deliveries, and owner days out."
      path="/skipper"
      bodyClass="page-skipper"
      ogImage="/images/TomBillingham.jpg"
      hero={
        <section className="page-hero">
          <div className="page-hero__inner">
            <p className="eyebrow">Primary service</p>
            <h1>Skipper for hire</h1>
            <p>
              You keep the boat. Tom brings the tickets, the miles, and the local knowledge —
              Golden Bay tides, weather windows, and quiet anchorages.
            </p>
          </div>
        </section>
      }
    >
      <section className="section">
        <div className="section__inner">
          <TrustChips />
          <div className="service-list">
            {SKIPPER_SERVICES.map((s) => (
              <article key={s.title}>
                <h2>{s.title}</h2>
                <p>{s.body}</p>
              </article>
            ))}
          </div>
          <div className="cta-row">
            <Link to="/contact" className="btn btn--gold">
              Enquire about skipper hire
            </Link>
            <a href={`mailto:${SITE_EMAIL}`} className="btn btn--ghost-dark">
              Email {SITE_EMAIL}
            </a>
            <a
              href={FACEBOOK_URL}
              className="text-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Message on Facebook →
            </a>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="section__inner split">
          <img src="/images/stock/marina.jpg" alt="" className="split__img" />
          <div>
            <h2>On your vessel</h2>
            <p>
              Whether you need a relief day, a coastal hop, or a calm hand while you enjoy your own
              boat, Tom works as an owner-operator — professional, personal, and local to Golden
              Bay.
            </p>
            <p className="fine-print">
              Operating within the privileges of his Skipper Restricted Limits (SRL) certificate.
              Vessel size and passenger limits apply as per Maritime NZ.
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
