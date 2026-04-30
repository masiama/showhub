import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import vueRouter from "vue-router/vite";

export default defineConfig({
  plugins: [vueRouter(), vue(), tailwindcss()],
});
