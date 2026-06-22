import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    // Split big third-party libs into cached vendor chunks so the initial
    // payload (and LCP) stays small — better Core Web Vitals = better SEO.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('framer-motion') || id.includes('/motion/')) return 'vendor-motion'
          if (id.includes('reactflow') || id.includes('@reactflow')) return 'vendor-flow'
          if (id.includes('lucide-react')) return 'vendor-icons'
          if (
            id.includes('react-dom') ||
            id.includes('/react/') ||
            id.includes('react-router') ||
            id.includes('scheduler')
          )
            return 'vendor-react'
          // Everything else: let Rollup decide (avoids circular vendor chunks).
        },
      },
    },
    chunkSizeWarningLimit: 900,
  },
})
