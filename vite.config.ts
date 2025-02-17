import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  test: {
    globals: true,
    setupFiles: './src/setupTests.ts',
    environment: 'jsdom',
  },
  plugins: [react(), tailwindcss()],
});
