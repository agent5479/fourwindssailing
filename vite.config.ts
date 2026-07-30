import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// GitHub Pages project site: set VITE_BASE=/fourwindssailing/ in CI.
// Custom domain / local: leave unset (defaults to /).
const base = process.env.VITE_BASE || '/';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, './shared'),
    },
  },
  base,
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
