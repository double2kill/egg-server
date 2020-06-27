<template>
  <div>
    <van-cell-group v-if="!route">
      <van-cell v-if="!!username" :title="username" is-link value="登出" @click="handleLogout" />
      <van-cell v-if="!username" title="登录" is-link @click="routeGoto('login')" />
      <van-cell title="更新日志" is-link @click="routeGoto('logs')" />
      <van-cell title="注册" is-link @click="routeGoto('signup')" />
    </van-cell-group>
    <Login v-if="route=== 'login'" :route-goto="routeGoto" />
    <Logs v-if="route=== 'logs'" />
    <SignUp v-if="route=== 'signup'" :route-goto="routeGoto" />
  </div>
</template>

<script>

import { Dialog } from 'vant'
import Logs from './logs'
import Login from './login'
import SignUp from './signup'

export default {
  name: 'User',
  components: {
    Logs,
    Login,
    SignUp
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
      Dialog.confirm({
        title: '登出',
        message: '确定要登出'
      }).then(() => {
        this.$store.dispatch('user/logout', {
          $cookies: this.$cookies
        })
      })
    }
  }
}

</script>
