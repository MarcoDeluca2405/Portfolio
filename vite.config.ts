import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
    server: {
    host: '0.0.0.0', // Esposizione sulla rete
    port: 5173,      // Puoi cambiare la porta se necessario
  },
  plugins: [react(),svgr({
    svgrOptions:{
      icon:true,
    }
  })],
  optimizeDeps:{
    include: ["gsap", "gsap/ScrollTrigger", "gsap/ScrollSmoother"]
  }
})
