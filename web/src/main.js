import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 引入element-ui
import ElementUI from 'element-ui';
Vue.use(ElementUI);

// 引入vue-router
import VueRouter from 'vue-router'
import router from './route'

Vue.use(VueRouter)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
