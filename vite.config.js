import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// base: './' keeps asset paths relative so the build also works on GitHub Pages.
export default defineConfig({
  plugins: [react()],
  base: './',
})
