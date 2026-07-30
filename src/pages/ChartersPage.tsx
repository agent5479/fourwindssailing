import { Link } from 'react-router-dom';
import SiteLayout from '../components/SiteLayout';
import { asset } from '../data/assets';
import { CHARTER_PACKAGES } from '../data/charters';

export default function ChartersPage() {
  return (
    <SiteLayout
      title="Private Sailing Charters Golden Bay | Four Winds Sailing"
      description="Private skippered sailing charters in Golden Bay, NZ — short bay sails, half-day, full-day, and intro to sailing with SRL skipper Tom Billingham."
      path="/charters"
      bodyClass="page-charters"
      ogImage="/images/yacht2.jpg"
      ogImageAlt="Private sailing charter under sail in Golden Bay"
      hero={
        <section className="page-hero page-hero--photo">
          <img
            src={asset('/images/yacht2.jpg')}
            alt=""
            className="page-hero__bg"
            aria-hidden="true"
          />
          <div className="page-hero__veil" aria-hidden="true" />
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
                <img src={asset(pkg.image)} alt="" />
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
            Listed prices are estimates only — final rates are TBA or confirmed upon enquiry.
            Payment arranged directly — no online checkout yet.
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
