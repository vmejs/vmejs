import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
      '@vmejs/core': resolve(__dirname, '../../packages/core/index.ts'),
      '@vmejs/shared': resolve(__dirname, '../../packages/shared/index.ts'),
      '@vmejs/vue-hooks': resolve(__dirname, '../../packages/vue-hooks/index.ts'),
    },
  },
})
