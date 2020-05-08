<template>
  <div class="others">
    <el-row :gutter="20">
      <el-col
        v-for="item in links"
        :key="item.href"
        :xs="24"
        :sm="12"
        :md="8"
        :lg="6"
      >
        <el-card class="card">
          <el-link type="primary" :href="item.href" :target="item.target">
            {{ item.text }}
          </el-link>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    links: {
      default: () => [],
      type: Array
    }
  }
}
</script>

<style scoped>
.others {
  max-width: 1024px;
  margin: 0 auto;
}
.card {
  margin-top: 20px;
}
</style>
