import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import eslintPlugin from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
      // オプションでESLintの設定をカスタマイズできます
      cache: false, // ESLintのキャッシュを無効にする例
    }),
  ],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
