import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import rollupNodePolyFill from "rollup-plugin-node-polyfills";
import { viteExternalsPlugin } from "vite-plugin-externals";

export default defineConfig({
  build: {
    minify: false,
    lib: {
      entry: resolve(__dirname, "./src/main.js"),
      name: "Button",
      fileName: "button",
      // formats: ["es", "iife"],
    },
    rollupOptions: {
      plugins: [rollupNodePolyFill()],
      external: ["vue", "ant-design-vue"],
      output: {
        globals: {
          vue: "Vue",
          "ant-design-vue": "antd",
        },
      },
    },
  },
  plugins: [
    vue(),
    // viteExternalsPlugin({
    //   vue: "Vue",
    //   "ant-design-vue": "antd",
    // }),
  ],
  define: {
    "process.env": {},
  },
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
