<template>
  <div class="login-page">
    <el-button @click="handleGithubLogin">
      <github-icon />
      github 登录
    </el-button>
  </div>
</template>

<script>
import qs from 'querystring'
import githubIcon from './github-icon'
import { EGG_SERVER } from '@/constants'

export default {
  components: {
    'github-icon': githubIcon
  },
  methods: {
    handleGithubLogin() {
      const { query } = this.$router.history.current
      const queryStr = encodeURIComponent(qs.stringify(query))
      location.href = `${EGG_SERVER}/?backURL=${location.origin}?${queryStr}`
    }
  }
}
</script>

<style>
    .login-page {
        padding: 15px;
        max-width: 1024px;
        margin: 0 auto;
    }
</style>
