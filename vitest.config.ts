import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@vmejs/shared': resolve(__dirname, 'packages/shared/index.ts'),
      '@vmejs/core': resolve(__dirname, 'packages/core/index.ts'),
      '@vmejs/vue-hooks': resolve(__dirname, 'packages/vue-hooks/index.ts'),
      '@vmejs/react-hooks': resolve(__dirname, 'packages/react-hooks/index.ts'),
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom', // or 'jsdom', 'node'
    reporters: 'dot',
  },
});
