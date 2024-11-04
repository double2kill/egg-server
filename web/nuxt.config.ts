const pkg = require("./package");
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-04',
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
  css: ["assets/main.css"],
  plugins: [
    { src: "@/plugins/ckeditor", mode: "client" },
  ],
  modules: ["@element-plus/nuxt", "@pinia/nuxt"],
  // elementPlus: {},
  // axios: {},s
  // apollo: {
  //   clientConfigs: {
  //     default: {
  //       httpEndpoint: "http://www.greatwebtech.cn:7001/graphql",
  //     },
  //   },
  // },
});
