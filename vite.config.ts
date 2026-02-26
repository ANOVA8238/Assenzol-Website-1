import { defineConfig } from 'vite';

export default defineConfig({
  base: '/Assenzol-Website-1/',
  server: {
    port: 3000,
    host: '0.0.0.0',
    hmr: process.env.DISABLE_HMR !== 'true',
  },
});
