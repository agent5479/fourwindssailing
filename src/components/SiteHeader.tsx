import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { asset } from '../data/assets';
import { FACEBOOK_URL, NAV_LINKS, SITE_NAME } from '../data/siteConfig';

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="site-logo" onClick={() => setOpen(false)}>
          <img src={asset('/images/logo.png')} alt="" width={48} height={48} />
          <span className="site-logo__text">
            <strong>{SITE_NAME}</strong>
            <em>Golden Bay</em>
          </span>
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span />
          <span />
        </button>

        <nav id="primary-nav" className={`site-nav${open ? ' site-nav--open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => (isActive ? 'is-active' : undefined)}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <a
            href={FACEBOOK_URL}
            className="nav-social"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            Facebook
          </a>
          <Link to="/skipper" className="btn btn--gold btn--sm" onClick={() => setOpen(false)}>
            Hire Skipper
          </Link>
        </nav>
      </div>
    </header>
  );
}
