import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Vital para GitHub Pages relativo sin problemas de rutas
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
});
