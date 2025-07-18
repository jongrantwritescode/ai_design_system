import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.js'],
    globals: true,
    css: true,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
}); 