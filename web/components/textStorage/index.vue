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
    <van-tabs v-model="active">
      <van-tab title="列表">
        <List v-if="active === 0" :handle-change-active-tab="handleChangeActiveTab" />
      </van-tab>
      <van-tab title="存储区">
        <Storage v-if="active === 1" :storage-name-from-list="storageName" />
      </van-tab>
      <van-tab :title="username" :dot="logsDot">
        <User v-if="active === 2" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Storage from './storage'
import List from './list'
import User from './user'

export default {
  name: 'TextStorage',
  components: {
    Storage,
    List,
    User
  },
  data() {
    return {
      logsDot: false,
      active: 1,
      storageName: ''
    }
  },
  computed: {
    username() {
      return this.$store.state.user.username || '游客'
    }
  },
  methods: {
    handleChangeActiveTab(active, storageName) {
      this.active = active
      this.storageName = storageName
    },
    handleAdd() {
      this.handleChangeActiveTab(1, 'add')
    }
  }
}

</script>
