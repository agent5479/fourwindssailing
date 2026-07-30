import { Link } from 'react-router-dom';
import SiteLayout from '../components/SiteLayout';
import BookForm from './BookForm';

export default function BookPage() {
  return (
    <SiteLayout
      title="Book a Sailing Charter Golden Bay | Four Winds Sailing"
      description="Request a private sailing charter in Golden Bay with Tom Billingham — short sails, half-day, full-day, or intro to sailing. Weather-dependent; confirm directly."
      path="/book"
      bodyClass="page-book"
      hero={
        <section className="page-hero">
          <div className="page-hero__inner">
            <p className="eyebrow">Charters</p>
            <h1>Book a sail</h1>
            <p>
              Choose a package, pick a date, and send a request. Prices shown are estimates —
              Tom will confirm final rates, weather, and arrange payment directly.
            </p>
            <Link to="/contact" className="text-link">
              Prefer to enquire first? Contact Tom →
            </Link>
          </div>
        </section>
      }
      mainClassName="book-page-main"
    >
      <section className="form-panel">
        <BookForm />
      </section>
    </SiteLayout>
  );
}
