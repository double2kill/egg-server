<template>
  <div>
    <van-cell-group v-if="!route">
      <van-cell v-if="!!username" :title="username" is-link value="登出" @click="handleLogout" />
      <van-cell v-if="!username" title="登录" is-link @click="routeGoto('login')" />
      <van-cell title="更新日志" is-link @click="routeGoto('logs')" />
    </van-cell-group>
    <Login v-if="route=== 'login'" :route-goto="routeGoto" />
    <Logs v-if="route=== 'logs'" />
  </div>
</template>

<script>

import Logs from './logs'
import Login from './Login'

export default {
  name: 'User',
  components: {
    Logs,
    Login
  },
  data() {
    return {
      route: ''
    }
  },
  computed: {
    username() {
      return this.$store.state.user.username
    }
  },
  methods: {
    routeGoto(route) {
      this.route = route
    },
    handleLogout() {
      this.$confirm('确定要登出', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('user/logout', {
          $cookie: this.$cookies
        })
      })
    }
  }
}

</script>
