import VueRouter from 'vue-router'
import Weather from "../components/Weather.vue";
import SSHInfo from "../components/sshInfo/index.vue";

const routes = [
  { path: '/weather', component: Weather },
  { path: '/sshInfo', component: SSHInfo }
]

export default new VueRouter({
  routes
})