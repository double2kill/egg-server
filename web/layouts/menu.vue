<template>
  <el-menu
    class="menu"
    :default-active="defaultMenu"
    mode="horizontal"
    @select="handleSelect"
  >
    <template v-for="(route, index) in hasPermisionMenuRoutes">
      <el-menu-item
        v-if="!route.subMenuRouteList"
        :key="route.path"
        :index="route.path"
      >
        {{ route.name }}
      </el-menu-item>
      <!-- <el-sub-menu v-else :key="index" :index="String(index)">
        <template slot="title">
          {{ route.name }}
        </template>
        <el-menu-item
          v-for="subRoute in route.subMenuRouteList"
          :key="subRoute.path"
          :index="subRoute.path"
        >
          {{ subRoute.name }}
        </el-menu-item>
      </el-sub-menu> -->
    </template>
  </el-menu>
</template>

<script>
import { routeList, routeNameMap } from "@/constants";

const adminExtraMenu = [
  { path: "/admin", name: "切换至管理员模式" },
  { path: "/", name: "切换至用户模式", mode: "admin" },
];

export default {
  name: "Menu",
  data() {
    const { history, options } = this.$router;
    const { path, query } = history?.current || { query: { mode: "" } };

    const RoutesNotInConfig = options.routes.filter((route) => {
      const isOneOfRouteList = Object.keys(routeNameMap).some(
        (item) => item === route.path
      );
      return !isOneOfRouteList;
    });

    return {
      mode: query.mode,
      defaultMenu: path,
      menuRoutes:
        RoutesNotInConfig.length > 0
          ? routeList.concat({
              name: "未配置的路由",
              subMenuRouteList: RoutesNotInConfig,
            })
          : routeList,
    };
  },
  computed: {
    hasPermisionMenuRoutes() {
      const { query } = this.$router.history?.current || { query: {} };
      const { admin } = query;
      let menuRoutes = this.menuRoutes;
      if (admin) {
        menuRoutes = [...menuRoutes, ...adminExtraMenu];
      }
      const mode = this.getCurrentMode(query);
      if (mode === "admin") {
        return menuRoutes.filter((item) => item.mode === "admin");
      }
      return menuRoutes.filter((item) => !item.mode);
    },
  },
  methods: {
    getCurrentMode(query) {
      return this.mode || query.mode;
    },
    handleSelect(key) {
      const { query } = this.$router.history?.current || { query: {} };
      let mode = this.getCurrentMode(query);
      // if (mode === "admin") {
      //   if (key === "/") {
      //     mode = undefined;
      //   }
      // } else if (key === "/admin") {
      //   mode = "admin";
      // }
      this.$router.push(
        {
          path: key,
          query: {
            ...query,
            showMenu: true,
            mode,
          },
        },
        () => {
          this.mode = mode;
          this.defaultMenu = key;
        }
      );
    },
  },
  validate({ params, query }) {
    return false;
  },
};
</script>

<style scoped>
.menu {
  display: flex;
  justify-content: center;
}
</style>
