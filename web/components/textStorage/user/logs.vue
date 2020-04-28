<template>
  <van-list>
    <van-cell
      v-for="log in logs"
      :key="log.id"
      :class="{ unread: unreadLogs.some(unreadLog => unreadLog.id === log.id) }"
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
  props: {
    unreadLogs: {
      default: () => [],
      type: Array
    }
  },
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
.unread .van-cell__value--alone {
  color: #07c160;
}
</style>
