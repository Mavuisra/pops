import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@babel/runtime': '@babel/runtime',
    },
  },
  optimizeDeps: {
    include: ['@babel/runtime/helpers/extends'],
  },
  server: {
    host: '0.0.0.0', // Permet à Vite d'être accessible depuis le réseau local
    port: 3000,      // Optionnel: définit le port (3000 est par défaut)
  }
});
