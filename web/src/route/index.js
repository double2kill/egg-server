import VueRouter from 'vue-router'
import Weather from "../components/Weather.vue";

const routes = [
  { path: '/weather', component: Weather },
]

export default new VueRouter({
  routes
})