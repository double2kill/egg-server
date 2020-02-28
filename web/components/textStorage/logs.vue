<template>
  <van-steps direction="vertical" :active="0">
    <van-step v-for="log in logs" :key="log.id">
      <p class="text" v-text="log.text" />
      <p class="time">
        {{ log.updateTime }}
      </p>
    </van-step>
  </van-steps>
</template>

<script>

export default {
  name: 'StorageList',
  data() {
    return {
      logs: [
        { id: 1, text: '1. 【仓库】增加清空按钮\n2. 新增【更新日志】可查看近期更新内容', updateTime: '2020-2-28 22:02:35' },
        { id: 1, text: '增加【列表】，现在可以查看所有的仓库列表了，点击列表中的仓库可查看其内容', updateTime: '2020-2-28 21:48:52' },
        { id: 2, text: '更换组件库，仓库名支持修改', updateTime: '2020-2-12 23:12:29' },
        { id: 3, text: '增加复制功能', updateTime: '2020-2-10 23:28:29' },
        { id: 4, text: '文字收集仓上线，提供储存文字的功能', updateTime: '2020-2-8 21:20:29' }
      ]
    }
  }
}

</script>

<style scoped>
.text {
  white-space: pre-wrap;
  margin-bottom: 5px;
}
.time {
  font-size: 13px;
}
</style>
