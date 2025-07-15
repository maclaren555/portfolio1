import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://portfolio1-q9so.vercel.app/',
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    allowedHosts: ['.trycloudflare.com']
  }
})
