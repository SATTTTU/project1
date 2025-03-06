
import path from "path"; // Import path module
// <<<<<<< HEAD
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // plugins: [react()],
// plugins: [react(),tailwindcss()],
// =======
// import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
// export default defineConfig({
  plugins: [react(),tailwindcss()],
// >>>>>>> 6eef4a6408bf48f8ce8a6e58564cff0345e7ddfc
  resolve: {
    alias: {
      "@":"src", // Corrected alias configuration
    },
  },
});




