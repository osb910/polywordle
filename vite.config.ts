import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {resolve} from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Enable React Fast Refresh
    hmr: {
      overlay: false,
    },
  },
  resolve: {
    alias: {
      // Add aliases for asset directories
      '@/assets': resolve(__dirname, 'src/assets'),
    },
  },
  optimizeDeps: {
    include: ['@/assets/sfx/shuffling-cards.mp3', '@/assets/images/globe.svg'],
  },
});
