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
        Price to be announced. Need a vessel delivery instead?{' '}
        <Link to="/skipper">See deliveries</Link> or <Link to="/contact">send an enquiry</Link>.
      </p>
    </div>
  );
}
