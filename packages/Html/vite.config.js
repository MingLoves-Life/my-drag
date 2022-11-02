import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import rollupNodePolyFill from "rollup-plugin-node-polyfills";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "./src/main.js"),
      name: "Button",
      fileName: "button",
    },
    rollupOptions: {
      plugins: [rollupNodePolyFill()],
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: "buffer",
        replacement: "rollup-plugin-node-polyfills/polyfills/buffer-es6",
      },
      {
        find: "process",
        replacement: "rollup-plugin-node-polyfills/polyfills/process-es6",
      },
    ],
  },
});
