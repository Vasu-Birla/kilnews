// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr'; // ✅ प्लगइन को इम्पोर्ट करें

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr() // ✅ प्लगइन को यहाँ जोड़ें
  ],
})