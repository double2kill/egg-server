import VueRouter from 'vue-router'
import Weather from "../components/Weather.vue";
import SSHInfo from "../components/sshInfo/index.vue";
import List from "../components/list/index.vue";
import Form from "../components/list/Form.vue";
import Timeline from "../components/timeLine/index.vue";

const routes = [
  { path: '/weather', component: Weather, displayName: '天气' },
  { path: '/sshInfo', component: SSHInfo, displayName: 'ssh信息' },
  { path: '/list', component: List, displayName: 'list' },
  { path: '/list/tableAdd', component: Form },
  { path: '/list/table/:id', name: 'list/table', component: Form },
  { path: '/timeLine', name: 'timeLine', component: Timeline, displayName: '时间线' },
]

export const menuRoutes = routes
  .filter(route => route.displayName)
  .map(route => ({
    path: route.path,
    displayName: route.displayName
  }))

export default new VueRouter({
  routes
})