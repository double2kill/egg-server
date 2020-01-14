<template>
  <el-menu
    :default-active="defaultMenu"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="/">
      首页
    </el-menu-item>
    <el-menu-item
      v-for="route in menuRoutes"
      :key="route.path"
      :index="route.path"
    >
      {{ route.name }}
    </el-menu-item>
  </el-menu>
</template>

<script>
// import { menuRoutes } from '../route'
export default {
  name: 'Menu',
  data() {
    const { history, options } = this.$router
    const { path } = history.current
    return {
      defaultMenu: path,
      menuRoutes: options.routes.filter(route => route.name !== 'index')
    }
  },
  methods: {
    handleSelect(key) {
      this.$router.push({
        path: key
      })
    }
  },
  validate({ params, query }) {
    return false
  }
}
</script>

<style>
@media screen and (max-width: 800px) {
  .el-menu-demo {
    display: none;
  }
}
</style>
