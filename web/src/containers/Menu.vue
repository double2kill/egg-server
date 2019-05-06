<template>
  <el-menu class="el-menu-demo" mode="horizontal"
    :default-active="defaultMenu"
    @select="handleSelect"
  >
    <el-menu-item index="/">首页</el-menu-item>
    <el-menu-item v-for="route in menuRoutes" :key="route.path" :index="route.path">
      {{ route.displayName }}
    </el-menu-item>
    <!-- <el-menu-item index="/weather">天气</el-menu-item>
    <el-menu-item index="/sshInfo">ssh信息</el-menu-item>
    <el-menu-item index="/list">list</el-menu-item>
    <el-menu-item index="/weather" disabled>爬虫</el-menu-item> -->
  </el-menu>
</template>

<script>

import { menuRoutes } from '../route'

export default {
  name: "Menu",
  data() {
    const {
      path
    } = this.$router.history.current
    return {
      defaultMenu: path,
      menuRoutes
    }
  },
  methods: {
    handleSelect(key) {
      this.$router.push({
        path: key
      })
    }
  }
}
</script>

<style>
.el-menu-demo {
  width: 100%;
  max-width: 800px;
  display: inline-block;
}

@media screen and (max-width: 700px) {
  .el-menu-item:not(.is-active) {
    display: none;
  }
}
</style>