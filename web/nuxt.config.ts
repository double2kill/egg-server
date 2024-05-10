const pkg = require("./package");
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
      script: [
        {
          innerHTML: `
            var _hmt = _hmt || [];
            (function() {
              var hm = document.createElement("script");
              hm.src = "https://hm.baidu.com/hm.js?350aab8bc892a5990e0c3d9c3788c4ab";
              var s = document.getElementsByTagName("script")[0]; 
              s.parentNode.insertBefore(hm, s);
            })();
          `,
          type: "text/javascript",
          async: "true",
        },
      ],
    },
  },
  css: ["assets/main.css"],
  plugins: [
    { src: "@/plugins/element-ui", ssr: true },
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
