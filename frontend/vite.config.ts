import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: [
      'localhost',
      'jodhbirs-frontend--5173.prod2.defang.dev',
      'jodhbirs-frontend.prod2.defang.dev'
    ],
    proxy: {
      '/fights': {
        target: 'https://jodhbirs-backend.prod2.defang.dev',
        changeOrigin: true,
        secure: true
      }
    }
  },
});