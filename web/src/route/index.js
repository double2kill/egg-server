import VueRouter from 'vue-router'
import Weather from "../components/Weather.vue";
import SSHInfo from "../components/sshInfo/index.vue";
import List from "../components/list/index.vue";

const routes = [
  { path: '/weather', component: Weather },
  { path: '/sshInfo', component: SSHInfo },
  { path: '/list', component: List },
]

export default new VueRouter({
  routes
})