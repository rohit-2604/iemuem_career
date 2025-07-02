import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// Optional: Uncomment to use image optimization
// import viteImagemin from 'vite-plugin-imagemin'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Optional: Uncomment to use image optimization
    // viteImagemin({
    //   gifsicle: { optimizationLevel: 3 },
    //   optipng: { optimizationLevel: 7 },
    //   pngquant: { quality: [0.65, 0.9] },
    //   svgo: { plugins: [{ removeViewBox: false }] },
    //   webp: { quality: 75 },
    // }),
  ],
  build: {
    rollupOptions: {
      output: {
        // Manual chunking for libraries like lottie-web
        manualChunks(id) {
          if (id.includes('node_modules/lottie-web')) {
            return 'lottie-web' // Separate chunk for lottie-web
          }
          if (id.includes('node_modules')) {
            return 'vendor' // Separate chunk for other node_modules
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase chunk size warning to 1000 KB
  },
})
