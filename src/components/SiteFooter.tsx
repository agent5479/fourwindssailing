import { Link } from 'react-router-dom';
import { asset } from '../data/assets';
import {
  CREDENTIALS,
  FACEBOOK_URL,
  SITE_EMAIL,
  SITE_LOCATION,
  SITE_NAME,
  SITE_TAGLINE,
} from '../data/siteConfig';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <img src={asset('/images/logo.png')} alt="" width={56} height={56} />
          <div>
            <strong>{SITE_NAME}</strong>
            <p>{SITE_TAGLINE}</p>
            <p>{SITE_LOCATION}</p>
          </div>
        </div>

        <div className="site-footer__links">
          <Link to="/charters">Charters</Link>
          <Link to="/skipper">Deliveries</Link>
          <Link to="/book">Book a sail</Link>
          <Link to="/about">About Tom</Link>
          <Link to="/contact">Contact</Link>
          <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
        </div>

        <div className="site-footer__meta">
          <p>
            <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>
          </p>
          <ul className="cred-list cred-list--compact">
            {CREDENTIALS.map((c) => (
              <li key={c.id}>
                {c.label} — {c.issuer}
              </li>
            ))}
          </ul>
          <p className="fine-print">© {new Date().getFullYear()} {SITE_NAME}</p>
        </div>
      </div>
    </footer>
  );
}
