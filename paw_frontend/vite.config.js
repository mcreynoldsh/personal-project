import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { splitVendorChunkPlugin } from 'vite'
// https://vitejs.dev/config/
export default defineConfig({

  // vite uses this as a prefix for href and src URLs
  base: '/static/',
  build: {
    // this is the folder where vite will generate its output. Make sure django can serve files from here!
    outDir: '../paw_platoon_project/static',
    emptyOutDir: true,
    sourcemap: true,
    chunkSizeWarningLimit: 6000,
  },
  plugins: [react(),splitVendorChunkPlugin()]
})
