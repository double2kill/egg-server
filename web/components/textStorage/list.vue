<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="getList"
  >
    <van-cell v-for="item in list" :key="item.updateTime" :title="item.name" @click="handleClick(item.name)">
      <van-button type="danger" size="small" plain @click.stop="handleDelete(item)">
        删除
      </van-button>
      <dateTime slot="label" :value="item.updateTime" />
    </van-cell>
  </van-list>
</template>

<script>

import { Dialog } from 'vant'
import { textStorageService, textStorageListService } from './service'
import dateTime from './common/dateTime'

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
        this.list = await textStorageListService.get()
        this.loading = false
        this.finished = true
      } catch (error) {
        this.finished = true
        this.loading = false
      }
    },
    handleClick(name) {
      this.handleChangeActiveTab(1, name)
    },
    handleDelete(delItem) {
      Dialog.confirm({
        title: '删除',
        message: '确定删除该仓库？'
      }).then(async () => {
        // on confirm
        // 先删除仓库数据，再删除仓库列表
        await textStorageService.post(delItem.name, ' ')
        const { updateTime } = delItem
        await textStorageListService.delete(updateTime)
        this.list = this.list.filter(item => item.updateTime !== updateTime)
      }).catch(() => {
        // on cancel
      })
    }
  }
}

</script>
