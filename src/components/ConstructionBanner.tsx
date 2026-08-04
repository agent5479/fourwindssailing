export const CONSTRUCTION_BANNER_MESSAGE =
  'Under construction! Charters unavailable until late summer 2027';

export default function ConstructionBanner() {
  return (
    <div className="construction-banner" role="status" aria-live="polite">
      <p className="construction-banner__text">{CONSTRUCTION_BANNER_MESSAGE}</p>
    </div>
  );
}
