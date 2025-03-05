import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // Import path module
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  resolve: {
    alias: {
      "@":"src", // Corrected alias configuration
    },
  },
});
