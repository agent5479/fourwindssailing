import { Link } from 'react-router-dom';
import SiteLayout from '../components/SiteLayout';
import TrustChips from '../components/TrustChips';
import { asset } from '../data/assets';
import { PAGE_SEO, SAMPLE_EXPERIENCE } from '../data/siteConfig';

export default function AboutPage() {
  const seo = PAGE_SEO.about;
  return (
    <SiteLayout
      title={seo.title}
      description={seo.description}
      keywords={seo.keywords}
      path="/about"
      bodyClass="page-about"
      ogImage="/images/TomBillingham.jpg"
      ogImageAlt="Tom Billingham, skipper — Four Winds Sailing, Golden Bay"
      ogType="profile"
      hero={
        <section className="page-hero">
          <div className="page-hero__inner">
            <p className="eyebrow">About</p>
            <h1>Tom Billingham</h1>
            <p>Owner-operator of Four Winds Sailing — Golden Bay, New Zealand.</p>
          </div>
        </section>
      }
    >
      <section className="section">
        <div className="section__inner about-grid">
          <img
            src={asset('/images/TomBillingham.jpg')}
            alt="Tom Billingham"
            className="about-grid__photo"
            width={420}
            height={420}
          />
          <div>
            <h2>Local waters. Trusted hands.</h2>
            <p>
              Kia ora — I’m Tom. I launched Four Winds Sailing to share Golden Bay under sail:
              skippering for boat owners who need a capable local hand, and hosting intimate
              private charters and intro sails on my own yacht.
            </p>
            <p>
              I’m not running a tourist conveyor belt. Whether I’m on your deck or mine, you get
              the same calm, personal approach — weather-honest, safety-first, and tuned to what
              you actually want from the day.
            </p>
            <TrustChips />
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="section__inner">
          <h2>Credentials</h2>
          <ul className="cred-list">
            <li>
              <strong>Skipper Restricted Limits (SRL)</strong> — Maritime New Zealand (confirmed)
            </li>
            <li>
              <strong>RYA Yachtmaster</strong> — Royal Yachting Association (confirmed)
            </li>
          </ul>
          <h3>Experience (sample — replace with full CV)</h3>
          <ul className="sample-list">
            {SAMPLE_EXPERIENCE.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="section__inner split">
          <div>
            <h2>The yacht</h2>
            <p>
              An intimate trailer-sailer suited to Golden Bay day sails and intro coaching —
              whole-boat charters for small groups, not crowded decks.
            </p>
            <Link to="/charters" className="btn btn--navy">
              See charter packages
            </Link>
          </div>
          <img src={asset('/images/Yacht.jpg')} alt="Tom’s yacht" className="split__img" />
        </div>
      </section>

      <section className="section section--soft">
        <div className="section__inner">
          <h2>On the water</h2>
          <div className="gallery">
            <img src={asset('/images/yacht2.jpg')} alt="Yacht under sail along the coast" />
            <img
              src={asset('/images/familyatsea.jpg')}
              alt="Family in lifejackets enjoying the view from the cockpit"
            />
            <img src={asset('/images/Yacht.jpg')} alt="Tom’s yacht ashore, sail raised" />
            <img
              src={asset('/images/yachttransport.png')}
              alt="Yacht on trailer behind a van — mobile Golden Bay sailing"
            />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
