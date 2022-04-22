import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  publicDir: "./static/",
  site: "https://motoviaggiatori.it",
  vite: {
    ssr: {
      external: ["svgo"],
    },
  },
  integrations: [sitemap()],
});
