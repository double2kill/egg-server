// import Element from "element-ui";
// import locale from "element-ui/lib/locale/lang/en";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import MandMobile from "mand-mobile-next";
import "mand-mobile-next/dist/es/mand-mobile-next.min.css";

import Vant from "vant";
import "vant/lib/index.css";

export default defineNuxtPlugin((nuxtApp) => {
  // Vue.use(Element);
  nuxtApp.vueApp.use(MandMobile);
  nuxtApp.vueApp.use(Vant);
  nuxtApp.vueApp.use(ElementPlus);
});
