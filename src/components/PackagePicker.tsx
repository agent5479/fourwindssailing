import { Link } from 'react-router-dom';
import type { CharterPackageOption } from '../data/bookingPackages';

interface PackagePickerProps {
  packages: CharterPackageOption[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function PackagePicker({ packages, selectedId, onSelect }: PackagePickerProps) {
  return (
    <div className="package-picker">
      {packages.map((pkg) => (
        <button
          key={pkg.id}
          type="button"
          className={`package-card${selectedId === pkg.id ? ' package-card--selected' : ''}`}
          onClick={() => onSelect(pkg.id)}
        >
          <strong>{pkg.label}</strong>
          <span className="package-card__desc">{pkg.description}</span>
          <span className="package-card__price">{pkg.priceLabel}</span>
        </button>
      ))}
      <p className="package-picker__note">
        Prices are estimates — TBA or confirmed upon enquiry. Prefer skipper hire on your own
        boat? <Link to="/contact">Send an enquiry</Link> instead.
      </p>
    </div>
  );
}
