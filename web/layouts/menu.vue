<template>
  <el-menu
    class="menu"
    :default-active="defaultMenu"
    mode="horizontal"
    @select="handleSelect"
  >
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
import { routeList } from '@/constants'

export default {
  name: 'Menu',
  data() {
    const { history, options } = this.$router
    const { path } = history.current

    const extraRoutes = options.routes
      .filter((route) => {
        const isOneOfRouteList = routeList.some(item => item.path === route.path)
        return !isOneOfRouteList
      })

    return {
      defaultMenu: path,
      menuRoutes: routeList.concat(extraRoutes)
    }
  },
  methods: {
    handleSelect(key) {
      this.$router.push({
        path: key,
        query: {
          showMenu: true
        }
      })
    }
  },
  validate({ params, query }) {
    return false
  }
}
</script>

<style scoped>
.menu {
  display: flex;
  justify-content: center;
}
</style>
