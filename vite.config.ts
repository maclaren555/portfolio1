import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/portfolio1/',
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    allowedHosts: ['.trycloudflare.com']
  }
})
