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
      "/getApi": {
        target: "http://localhost:3000/",
        timeout: 20 * 60 * 1000,
        changeOrigin: true,
      },
      '/getCryptoMatrixBlob': 'http://172.168.18.59:8081/',
      '/encrypt': 'http://172.168.18.59:8081/',
      '/encrypt1': 'http://172.168.18.59:8081/',
      '/downloadMatrix': 'http://172.168.18.59:8081/',
      "/alm_framework": {
        target: "http://47.108.165.207:20088/api",
        timeout: 20 * 60 * 1000,
        changeOrigin: true,
      },
    },
  },
  // base: '/vue-project',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: 'vue-project' // 设置打包文件夹的名称为'vue-project'
  }
})
