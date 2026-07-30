import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/site.css';

const el = document.getElementById('root');
if (!el) {
  throw new Error('Root element #root not found');
}

// Always client-render. Prerendered HTML in the response still helps non-JS crawlers;
// hydrateRoot was blanking some browsers on mismatch after the custom-domain switch.
createRoot(el).render(
  <StrictMode>
    <App />
  </StrictMode>
);
