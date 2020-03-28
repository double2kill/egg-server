<template>
  <div class="others">
    <el-row :gutter="20">
      <el-col v-for="item in links" :key="item.id" :span="8">
        <el-card class="card">
          <el-link type="primary" :href="item.href" target="_blank">
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
  data() {
    return {
      links: [
        { id: '1', href: 'http://code-craft.greatwebtech.cn/', text: 'code-craft' },
        { id: '2', href: 'http://table.greatwebtech.cn/', text: 'table' },
        { id: '3', href: 'http://birthday.greatwebtech.cn/', text: 'birthday' },
        { id: '4', href: 'http://cmd.greatwebtech.cn/', text: 'cmd' },
        { id: '5', href: 'http://family.greatwebtech.cn/', text: 'family' },
        { id: '6', href: 'http://handsontable.greatwebtech.cn/', text: 'handsontable' },
        { id: '7', href: 'http://hetenghuan.greatwebtech.cn/jenkins', text: 'jenkins' },
        { id: '8', href: 'http://hanxiaoluan.greatwebtech.cn/', text: 'reactApp' }
      ]
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
