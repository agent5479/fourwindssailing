import { Link } from 'react-router-dom';
import SiteLayout from '../components/SiteLayout';
import TrustChips from '../components/TrustChips';
import { asset } from '../data/assets';
import { CHARTER_PACKAGES } from '../data/charters';
import { PAGE_SEO, SITE_TAGLINE, TESTIMONIALS, FACEBOOK_URL } from '../data/siteConfig';

export default function HomePage() {
  const seo = PAGE_SEO.home;
  return (
    <SiteLayout
      title={seo.title}
      description={seo.description}
      keywords={seo.keywords}
      path="/"
      bodyClass="page-home"
      constructionBanner
      ogImage="/images/yacht2.jpg"
      ogImageAlt="Four Winds Sailing yacht under sail — Golden Bay, New Zealand"
      hero={
        <section className="hero">
          <div className="hero__media" aria-hidden="true">
            <img src={asset('/images/yacht2.jpg')} alt="" className="hero__bg" />
            <div className="hero__veil" />
          </div>
          <div className="hero__content">
            <img src={asset('/images/logo.png')} alt="Four Winds Sailing" className="hero__logo" />
            <p className="hero__brand">Four Winds Sailing</p>
            <h1 className="hero__title">Sailing charters in Golden Bay, Yacht Deliveries, Bareboat rental</h1>
            <p className="hero__support">{SITE_TAGLINE}</p>
            <div className="hero__ctas">
              <Link to="/charters" className="btn btn--gold">
                Private Charters
              </Link>
              <Link to="/skipper" className="btn btn--ghost">
                Deliveries
              </Link>
            </div>
          </div>
        </section>
      }
    >
      <section className="section meet-tom reveal">
        <div className="section__inner meet-tom__grid">
          <img
            src={asset('/images/TomBillingham.jpg')}
            alt="Tom Billingham, skipper"
            className="meet-tom__photo"
            width={480}
            height={480}
          />
          <div>
            <p className="eyebrow">Meet the skipper</p>
            <h2>Tom Billingham</h2>
            <p>
              Four Winds Sailing is Tom’s owner-operator service out of Golden Bay.
              SRL-qualified and RYA Yachtmaster Offshore–trained — private skippered and bareboat charters
              on Bright Sparx, plus vessel deliveries for boat owners. Flexible and personal.
            </p>
            <TrustChips compact />
            <Link to="/about" className="text-link">
              More about Tom →
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--navy reveal">
        <div className="section__inner">
          <p className="eyebrow eyebrow--gold">Primary</p>
          <h2>Sail on Bright Sparx</h2>
          <p>
            Skippered and bareboat charters on our Noelex 25, Bright Sparx, cruise Golden Bay
            with the option to take the boat into the Abel Tasman National Park.
          </p>
          <div className="package-teasers">
            {CHARTER_PACKAGES.filter((p) => !p.enquireOnly)
              .slice(0, 3)
              .map((pkg) => (
                <article key={pkg.id} className="teaser">
                  <img src={asset(pkg.image)} alt="" />
                  <h3>{pkg.title}</h3>
                  <p>{pkg.duration}</p>
                  <p className="teaser__price">{pkg.priceFrom}</p>
                </article>
              ))}
          </div>
          <Link to="/book" className="btn btn--gold">
            Enquire about Charter bookings
          </Link>
        </div>
      </section>

      <section className="section reveal">
        <div className="section__inner split">
          <div>
            <p className="eyebrow">Secondary</p>
            <h2>Delivery Skipper</h2>
            <p>
              Domestic and international Deliveries, Tom can do them all, with over 25,000 NM under
              the keels of various vessels, you can trust him with your pride and joy! Come along
              for the passage or have Tom organise the crew, all routes considered.
            </p>
            <Link to="/skipper" className="btn btn--navy">
              Enquire about deliveries
            </Link>
          </div>
          <img
            src={asset('/images/yachttransport.png')}
            alt="Yacht being transported"
            className="split__img"
          />
        </div>
      </section>

      <section className="section section--soft reveal">
        <div className="section__inner">
          <h2>What people say</h2>
          <div className="testimonials">
            {TESTIMONIALS.map((t) => (
              <blockquote key={t.name}>
                <p>“{t.quote}”</p>
                <footer>— {t.name}</footer>
                {'caption' in t && t.caption && (
                  <p className="testimonial__caption">{t.caption}</p>
                )}
                {'image' in t && t.image && (
                  <img
                    src={asset(t.image)}
                    alt={'imageAlt' in t && t.imageAlt ? t.imageAlt : ''}
                    className="testimonial__photo"
                  />
                )}
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-band reveal">
        <div className="section__inner cta-band__inner">
          <h2>Ready for Golden Bay under sail?</h2>
          <p>Private charters on Bright Sparx, or vessel deliveries with an experienced skipper.</p>
          <div className="hero__ctas">
            <Link to="/contact" className="btn btn--gold">
              Get in touch
            </Link>
            <Link to="/book" className="btn btn--ghost">
              Book a charter
            </Link>
            <a
              href={FACEBOOK_URL}
              className="btn btn--ghost"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
