import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Burası kalsın
import path from "path"

export default defineConfig({
  plugins: [
    react(),
    tailwindcss() as any, // Hata veren yerin yanına 'as any' ekleyerek TypeScript'i şimdilik susturabilirsin
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})