import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  public: './static/',
  buildOptions: {
    site: "https://motoviaggiatori.it",
  },
  vite: {
    ssr: {
      external: ["svgo"],
    },
  },
});
