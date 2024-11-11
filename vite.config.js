import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import glsl from 'vite-plugin-glsl'

// https://vitejs.dev/config/
export default defineConfig({
  root: './',
  publicDir: './public',
  base: './',
  build:
  {
      outDir: 'dist', // Output in the dist/ folder
      emptyOutDir: true, // Empty the folder first
      sourcemap: true, // Add sourcemap
      target: 'esnext'
  },
  plugins: [
    react(),
    glsl()
  ],

})
