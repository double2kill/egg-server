<template>
  <van-list>
    <van-cell
      v-for="log in logs"
      :key="log.id"
    >
      <p class="text" v-text="log.text" />
      <p class="time">
        {{ log.updateTime }}
      </p>
    </van-cell>
  </van-list>
</template>

<script>

import { logs } from '../data'

export default {
  name: 'StorageList',
  data() {
    return {
      logs
    }
  }
}

</script>

<style scoped>
.text {
  white-space: pre-line;
  margin-bottom: 5px;
}
.time {
  font-size: 13px;
}
</style>
