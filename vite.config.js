import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/pilot/',
  server: {
    port: 3000,
    host: true
  },
  build: {
    target: 'esnext',
    minify: false,
    outDir: 'dist'
  }
});
