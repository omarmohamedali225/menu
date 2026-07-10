import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      // devOptions: {
      //   enabled: true,
      // },
      manifest: {
        name: "El Baraka",
        short_name: "El Baraka",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#b91c1c",
        orientation: "portrait",
        icons: [
          {
            src: "/logo.webp",
            sizes: "192x192",
            type: "image/webp",
          },
          {
            src: "/logo.webp",
            sizes: "512x512",
            type: "image/webp",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
