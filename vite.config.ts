import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Custom domain (fourwindssailing.nz) and local: base `/`.
// Only set VITE_BASE=/fourwindssailing/ when testing the github.io project path.
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
