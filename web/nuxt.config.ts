import path from "path";

const pkg = require("./package");

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  alias: {
    "@": path.resolve(__dirname, "./"),
  },

  devtools: { enabled: true },

  app: {
    head: {
      title: pkg.name,
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { hid: "description", name: "description", content: pkg.description },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
      script: [],
    },
  },

  css: ["assets/main.css", "element-plus/dist/index.css"],

  plugins: [
    { src: "@/plugins/ckeditor", mode: "client" },
    { src: "@/plugins/element-ui", mode: "client" },
  ],

  modules: ["@element-plus/nuxt", "@pinia/nuxt"],

  nitro: {
    devProxy: {
      "/api/weathers": {
        target: "http://www.greatwebtech.cn:7001/v0.1/weathers",
        changeOrigin: true,
      },
    },
  },

  compatibilityDate: "2025-03-18",
});