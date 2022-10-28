import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        component: "index.html",
      },
      output: { dir: "dist", format: "cjs" },
    },
  },
  base: "./",
  plugins: [vue()],
});
