<template>
  <footer>
    <el-divider />
    <p>Copyright © 2019-{{ currentYear }}. All Rights Reserved. 连学军 版权所有</p>
    <p>
      <el-link href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">
        闽ICP备2022002919号-1
      </el-link>
    </p>
  </footer>
</template>
<script>
export default {
  name: 'Footer',
  data() {
    return {
      currentYear: new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
  footer {
    color: #606266;
    font-size: 13px;
    text-align: center;
    margin: 20px;
  }
</style>
