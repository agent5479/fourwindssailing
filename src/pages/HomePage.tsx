import { Link } from 'react-router-dom';
import SiteLayout from '../components/SiteLayout';
import TrustChips from '../components/TrustChips';
import { asset } from '../data/assets';
import { CHARTER_PACKAGES } from '../data/charters';
import { SEO_DEFAULT_DESCRIPTION, SITE_NAME, SITE_TAGLINE, TESTIMONIALS } from '../data/siteConfig';

export default function HomePage() {
  return (
    <SiteLayout
      title={`${SITE_NAME} | Tom Billingham — Golden Bay`}
      description={SEO_DEFAULT_DESCRIPTION}
      path="/"
      bodyClass="page-home"
      ogImage="/images/yacht2.jpg"
      hero={
        <section className="hero">
          <div className="hero__media" aria-hidden="true">
            <img src={asset('/images/yacht2.jpg')} alt="" className="hero__bg" />
            <div className="hero__veil" />
          </div>
          <div className="hero__content">
            <img src={asset('/images/logo.png')} alt="Four Winds Sailing" className="hero__logo" />
            <p className="hero__brand">Four Winds Sailing</p>
            <h1 className="hero__title">Your Golden Bay skipper — hire me, or sail with me</h1>
            <p className="hero__support">{SITE_TAGLINE}</p>
            <div className="hero__ctas">
              <Link to="/skipper" className="btn btn--gold">
                Hire Skipper
              </Link>
              <Link to="/charters" className="btn btn--ghost">
                Private Charters
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
              Four Winds Sailing is Tom’s owner-operator skipper service out of Golden Bay.
              SRL-qualified and RYA Yachtmaster–trained — relief skippering and deliveries for boat
              owners, plus private charters and intro sails on his yacht. Flexible, personal, no
              tourist conveyor belt.
            </p>
            <TrustChips compact />
            <Link to="/about" className="text-link">
              More about Tom →
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--navy reveal">
        <div className="section__inner split">
          <div>
            <p className="eyebrow eyebrow--gold">Primary</p>
            <h2>Skipper for hire</h2>
            <p>
              You keep the boat. Tom brings the tickets, the miles, and the local knowledge —
              Golden Bay tides, weather windows, and quiet anchorages.
            </p>
            <Link to="/skipper" className="btn btn--gold">
              Enquire about skipper hire
            </Link>
          </div>
          <img
            src={asset('/images/yachttransport.png')}
            alt="Yacht being transported"
            className="split__img"
          />
        </div>
      </section>

      <section className="section reveal">
        <div className="section__inner">
          <p className="eyebrow">Secondary</p>
          <h2>Private charters on Tom’s yacht</h2>
          <p className="lede">
            Same skipper, same care — whether he’s on your deck or his. Intimate whole-boat sails
            across Golden Bay — families welcome, lifejackets on, your pace.
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
          <figure className="home-family">
            <img
              src={asset('/images/familyatsea.jpg')}
              alt="Family in lifejackets looking out from the cockpit toward the Golden Bay coast"
            />
            <figcaption>
              Safe, personal sails — spare jackets in the cockpit, coast on the horizon.
            </figcaption>
          </figure>
          <Link to="/charters" className="btn btn--navy">
            Browse charters
          </Link>
        </div>
      </section>

      <section className="section section--soft reveal">
        <div className="section__inner">
          <h2>What people say</h2>
          <div className="testimonials">
            {TESTIMONIALS.map((t) => (
              <blockquote key={t.name}>
                <p>“{t.quote}”</p>
                <footer>
                  — {t.name}
                  <span className="fine-print"> ({t.note})</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-band reveal">
        <div className="section__inner cta-band__inner">
          <h2>Ready for Golden Bay under sail?</h2>
          <p>Skipper hire for boat owners, or a private charter on Tom’s yacht.</p>
          <div className="hero__ctas">
            <Link to="/contact" className="btn btn--gold">
              Get in touch
            </Link>
            <Link to="/book" className="btn btn--ghost">
              Book a charter
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
