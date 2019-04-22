import VueRouter from 'vue-router'
import Weather from "../components/Weather.vue";
import SSHInfo from "../components/sshInfo/index.vue";
import List from "../components/list/index.vue";
import Form from "../components/list/Form.vue";
import MongodbList from "../components/mongodb/collection.vue";

const routes = [
  { path: '/weather', component: Weather },
  { path: '/sshInfo', component: SSHInfo },
  { path: '/list', component: List },
  { path: '/list/tableAdd', component: Form },
  { path: '/list/table/:id', name: 'list/table', component: Form },
  { path: '/mongodb', name: 'mongodb', component: MongodbList },
]

export default new VueRouter({
  routes
})