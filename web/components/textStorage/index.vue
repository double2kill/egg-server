<template>
  <div>
    <van-nav-bar
      title="临时存储区"
    >
      <van-icon
        v-if="active === 0"
        slot="right"
        name="plus"
        size="20"
        color="#ee0a24"
        @click="handleAdd"
      />
    </van-nav-bar>
    <van-tabs v-model="active" @change="activeChange">
      <van-tab title="列表">
        <List v-if="active === 0" :handle-change-active-tab="handleChangeActiveTab" />
      </van-tab>
      <van-tab title="存储区">
        <Storage :storage-name-from-list="storageName" />
      </van-tab>
      <van-tab title="更新日志" :dot="logsDot">
        <Logs :unread-logs="unreadLogs" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Storage from './storage'
import List from './list'
import Logs from './logs'
import { logs, TEXT_STORAGE_READ_LOGS } from './data'

export default {
  name: 'TextStorage',
  components: {
    Storage,
    List,
    Logs
  },
  data() {
    return {
      unreadLogs: [],
      logsDot: false,
      active: 1,
      storageName: ''
    }
  },
  mounted() {
    const unreadLogs = this.getUnreadLogs()
    this.logsDot = unreadLogs.length > 0
  },
  methods: {
    handleChangeActiveTab(active, storageName) {
      this.active = active
      this.storageName = storageName
    },
    handleAdd() {
      this.handleChangeActiveTab(1, 'add')
    },
    getUnreadLogs() {
      const readLogs = JSON.parse(localStorage.getItem(TEXT_STORAGE_READ_LOGS) || '[]')
      return logs
        .filter(log => !readLogs.some(readLog => log.id === readLog.id))
        .filter(log => (logs[0].id - log.id < 3))
    },
    activeChange(active) {
      if (active === 2) {
        this.unreadLogs = this.getUnreadLogs()
        localStorage.setItem(TEXT_STORAGE_READ_LOGS, JSON.stringify(logs))
        this.logsDot = false
      }
    }
  }
}

</script>
