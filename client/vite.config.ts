import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import fs from 'fs';
import path from 'path';

const keyPath = path.resolve(__dirname, 'certs', 'key.pem');
const certPath = path.resolve(__dirname, 'certs', 'cert.pem');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  server: {
    hmr: true,
    host: '0.0.0.0', // Liisten all LAN addresses
    https: {
      key:  fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    },
    port: 8080,
  },
})
