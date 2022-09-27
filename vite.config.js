import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

const pathSrc = path.resolve(__dirname, "src");

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 1234,
  },
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue"],
      resolvers: [
        AntDesignVueResolver({
          resolveIcons: true,
        }),
      ],
      dts: path.resolve(pathSrc, "auto-imports.d.ts"),
    }),
    Components({
      resolvers: [
        AntDesignVueResolver({
          resolveIcons: true,
        }),
      ],
      dts: path.resolve(pathSrc, "components.d.ts"),
    }),
  ],
});
