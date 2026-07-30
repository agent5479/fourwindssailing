import { Link } from 'react-router-dom';
import SiteLayout from '../components/SiteLayout';
import { CHARTER_PACKAGES } from '../data/charters';

export default function ChartersPage() {
  return (
    <SiteLayout
      title="Private Charters | Four Winds Sailing — Golden Bay"
      description="Private skippered sailing charters in Golden Bay — short bay sails, half-day, full-day, and intro to sailing with Tom Billingham."
      path="/charters"
      bodyClass="page-charters"
      ogImage="/images/Yacht.jpg"
      hero={
        <section className="page-hero">
          <div className="page-hero__inner">
            <p className="eyebrow">Secondary service</p>
            <h1>Private charters</h1>
            <p>
              Intimate whole-boat sails on Tom’s yacht — your day, your way under sail across
              Golden Bay. Same skipper, same care.
            </p>
          </div>
        </section>
      }
    >
      <section className="section">
        <div className="section__inner">
          <div className="charter-grid">
            {CHARTER_PACKAGES.map((pkg) => (
              <article key={pkg.id} className="charter-card">
                <img src={pkg.image} alt="" />
                <div className="charter-card__body">
                  <h2>{pkg.title}</h2>
                  <p className="charter-card__meta">
                    {pkg.duration} · Up to {pkg.maxGuests} guests · Whole boat
                  </p>
                  <p>{pkg.blurb}</p>
                  <p className="charter-card__price">{pkg.priceFrom}</p>
                  {pkg.enquireOnly ? (
                    <Link to="/contact" className="btn btn--navy btn--sm">
                      Enquire
                    </Link>
                  ) : (
                    <Link to={`/book?package=${pkg.id}`} className="btn btn--navy btn--sm">
                      Book this sail
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
          <p className="fine-print center">
            Prices marked “(mock)” are placeholders until Tom confirms rates. Payment arranged
            directly — no online checkout in v1.
          </p>
          <div className="cta-row center">
            <Link to="/book" className="btn btn--gold">
              Open booking wizard
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
