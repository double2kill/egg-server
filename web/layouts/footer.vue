<template>
  <footer>
    <el-divider />
    <p>Copyright © 2019-{{ currentYear }}. All Rights Reserved. 连学军/刘晨 版权所有</p>
    <p>
      <el-link href="http://www.beian.miit.gov.cn" target="_blank">
        闽ICP备18009406号
      </el-link>
    </p>
  </footer>
</template>
<script>
export default {
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
