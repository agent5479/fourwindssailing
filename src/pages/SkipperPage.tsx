import { Link } from 'react-router-dom';
import SiteLayout from '../components/SiteLayout';
import TrustChips from '../components/TrustChips';
import { SKIPPER_SERVICES } from '../data/charters';
import { FACEBOOK_URL, PAGE_SEO, SITE_EMAIL } from '../data/siteConfig';

export default function SkipperPage() {
  const seo = PAGE_SEO.skipper;
  return (
    <SiteLayout
      title={seo.title}
      description={seo.description}
      keywords={seo.keywords}
      path="/skipper"
      bodyClass="page-skipper"
      ogImage="/images/TomBillingham.jpg"
      ogImageAlt="Skipper Tom Billingham — Four Winds Sailing"
      hero={
        <section className="page-hero">
          <div className="page-hero__inner">
            <p className="eyebrow">Secondary service</p>
            <h1>Delivery Skipper</h1>
            <p>
              Domestic and international Deliveries, Tom can do them all, with over 25,000 NM under
              the keels of various vessels, you can trust him with your pride and joy! Come along
              for the passage or have Tom organise the crew, all routes considered.
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
              Enquire about deliveries
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
    </SiteLayout>
  );
}
