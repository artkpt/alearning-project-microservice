import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server:{
    proxy:{
      // '/api/note':{
      //   target: 'http://note-service:3333',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api\/note/, '')
      // },
      // '/api/auth':{
      //   target: 'http://host.docker.internal:4000',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api\/auth/, '')
      // },
      '/api':{
        target: 'http://host.docker.internal:8080',
        changeOrigin: true
      }
    },
    watch: {
      usePolling: true,
    }
  },
})
