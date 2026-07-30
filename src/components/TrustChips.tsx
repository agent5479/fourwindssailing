import { CREDENTIALS } from '../data/siteConfig';

export default function TrustChips({ compact = false }: { compact?: boolean }) {
  return (
    <ul className={`trust-chips${compact ? ' trust-chips--compact' : ''}`}>
      {CREDENTIALS.map((c) => (
        <li key={c.id}>
          <strong>{c.label}</strong>
          <span>{c.issuer}</span>
        </li>
      ))}
      <li>
        <strong>Golden Bay local waters</strong>
        <span>New Zealand</span>
      </li>
      <li>
        <strong>Owner-operator</strong>
        <span>Four Winds Sailing</span>
      </li>
    </ul>
  );
}
