import path from "path";
import { defineConfig } from "vite"; // Ensure this is imported
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": "src", // Correct alias configuration
    },
  },
});
