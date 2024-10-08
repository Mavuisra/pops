import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // définit un chemin relatif pour le build
  build: {
    outDir: 'dist',
  },
});
