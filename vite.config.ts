import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  server: {
    host: "0.0.0.0",
    port: 1111,
    proxy: {
      "/api": {
        target: "http://47.108.165.207:20088/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
