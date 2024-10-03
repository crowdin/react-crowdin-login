import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/style.scss";`,
      },
    },
  },
  server: {
    open: true,
    port: 3000,
  },
});
