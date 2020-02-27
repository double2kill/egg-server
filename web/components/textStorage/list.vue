<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="getList"
  >
    <van-cell v-for="item in list" :key="item.updateTime" :title="item.name" @click="handleClick(item.name)" />
  </van-list>
</template>

<script>

import axios from 'axios'
import URL from '../../constants'

const SPAIR = URL.SPAIR

const liuchenStorageList = 'liuchen_StorageList'

export default {
  name: 'StorageList',
  props: {
    handleChangeActiveTab: {
      default: () => {},
      type: Function
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    async getList() {
      try {
        this.loading = true
        const res = await axios.get(`${SPAIR}/textStorage/${liuchenStorageList}`)
        this.loading = false
        this.finished = true
        this.list = JSON.parse(decodeURIComponent(res.data || '[]'))
      } catch (error) {
        this.finished = true
        this.loading = false
      }
    },
    handleClick(name) {
      this.handleChangeActiveTab(1, name)
    }
  }
}

</script>
