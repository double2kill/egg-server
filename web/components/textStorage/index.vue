<template>
  <div>
    <van-nav-bar
      title="文字收集仓"
    />
    <van-tabs v-model="active">
      <van-tab title="列表">
        <List v-if="active === 0" :handle-change-active-tab="handleChangeActiveTab" />
      </van-tab>
      <van-tab title="仓库">
        <Storage :storage-name-from-list="storageName" />
      </van-tab>
      <van-tab title="更新日志">
        <Logs />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Storage from './storage'
import List from './list'
import Logs from './logs'

export default {
  name: 'TextStorage',
  components: {
    Storage,
    List,
    Logs
  },
  data() {
    return {
      active: 1,
      storageName: ''
    }
  },
  methods: {
    handleChangeActiveTab(active, storageName) {
      this.active = active
      this.storageName = storageName
    }
  }
}

</script>
