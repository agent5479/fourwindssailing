import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import './styles/site.css';

const el = document.getElementById('root');
if (!el) {
  throw new Error('Root element #root not found');
}

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Prerendered Pages HTML already has content in #root — hydrate instead of wiping.
// Fall back to createRoot for empty shells (local vite-only builds).
if (el.hasChildNodes()) {
  hydrateRoot(el, app);
} else {
  createRoot(el).render(app);
}
