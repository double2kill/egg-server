<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="getList"
  >
    <van-cell v-for="item in list" :key="item.update_time" :title="item.key" @click="handleClick(item.key)">
      <van-button type="danger" size="small" plain @click.stop="handleDelete(item)">
        删除
      </van-button>
      <dateTime slot="label" :value="item.update_time" />
    </van-cell>
  </van-list>
</template>

<script>

import { Dialog } from 'vant'
import { textStorageService } from './service'
import dateTime from '@/common/dateTime'

export default {
  name: 'StorageList',
  components: {
    dateTime
  },
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
        this.list = await textStorageService.list()
        this.loading = false
        this.finished = true
      } catch (error) {
        this.finished = true
        this.loading = false
      }
    },
    handleClick(key) {
      this.handleChangeActiveTab(1, key)
    },
    handleDelete(delItem) {
      Dialog.confirm({
        title: '删除',
        message: '确定删除该仓库？'
      }).then(async () => {
        // on confirm
        await textStorageService.delete(delItem.key)
        const { key } = delItem
        this.list = this.list.filter(item => item.key !== key)
      }).catch(() => {
        // on cancel
      })
    }
  }
}

</script>
