import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import {viteCommonjs, esbuildCommonjs} from '@originjs/vite-plugin-commonjs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [viteCommonjs(), react()],
  server: {
    proxy: {
      "/static/plugins": {
        target: "http://127.0.0.1:3009",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
      "/socket.io": {
        target: "ws://127.0.0.1:2192",
        ws: true,
      },
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [esbuildCommonjs(['react-s3'])],
    },
  }
})
