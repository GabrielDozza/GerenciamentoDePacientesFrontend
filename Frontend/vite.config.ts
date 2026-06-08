import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/pacientes": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/eventos": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/evolucoes": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/profissionais": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/auth": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
})
