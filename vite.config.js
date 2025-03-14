import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve('src')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://khajabox-backend.dev.tai.com.np', 
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ''), 
      }
    }
  }
});
