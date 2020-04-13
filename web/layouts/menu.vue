<template>
  <el-menu
    class="menu"
    :default-active="defaultMenu"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item
      v-for="route in hasPermisionMenuRoutes"
      :key="route.path"
      :index="route.path"
    >
      {{ route.name }}
    </el-menu-item>
  </el-menu>
</template>

<script>
import { routeList } from '@/constants'

const adminExtraMenu = [
  { path: '/admin', name: '切换至管理员模式' },
  { path: '/', name: '切换至用户模式', mode: 'admin' }
]

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
      mode: undefined,
      defaultMenu: path,
      menuRoutes: routeList.concat(extraRoutes)
    }
  },
  computed: {
    hasPermisionMenuRoutes() {
      const { query } = this.$router.history.current
      const { admin } = query
      let menuRoutes = this.menuRoutes
      if (admin) {
        menuRoutes = [...menuRoutes, ...adminExtraMenu]
      }
      const mode = this.getCurrentMode(query)
      if (mode === 'admin') {
        return menuRoutes.filter(item => item.mode === 'admin')
      }
      return menuRoutes.filter(item => !item.mode)
    }
  },
  methods: {
    getCurrentMode(query) {
      return this.mode || query.mode
    },
    handleSelect(key) {
      const { query } = this.$router.history.current
      let mode = this.getCurrentMode(query)
      if (mode === 'admin') {
        if (key === '/') {
          mode = undefined
        }
      } else if (key === '/admin') {
        mode = 'admin'
      }

      this.$router.push({
        path: key,
        query: {
          ...query,
          showMenu: true,
          mode
        }
      }, () => {
        this.mode = mode
        this.defaultMenu = key
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
