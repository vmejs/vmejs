import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@vmejs/core': resolve(__dirname, '../../packages/core/index.ts'),
      '@vmejs/shared': resolve(__dirname, '../../packages/shared/index.ts'),
      '@vmejs/react-hooks': resolve(__dirname, '../../packages/react-hooks/index.ts'),
    },
  },
})
