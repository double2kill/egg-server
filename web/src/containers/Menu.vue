<template>
  <el-menu class="el-menu-demo" mode="horizontal"
    :default-active="defaultMenu"
    @select="handleSelect"
  >
    <el-menu-item index="/">首页</el-menu-item>
    <el-menu-item index="/weather">天气</el-menu-item>
    <el-menu-item index="/weather" disabled>爬虫</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "Menu",
  data() {
    const {
      path
    } = this.$router.history.current
    return {
      defaultMenu: path
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
</style>