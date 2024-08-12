import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), VitePWA({ registerType: "autoUpdate" }), react()],
  server: {
    port: 3000,
    host: true,
  },
});
