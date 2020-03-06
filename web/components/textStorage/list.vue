<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="getList"
  >
    <van-cell v-for="item in list" :key="item.updateTime" :title="item.name" :label="item.updateTimeText" @click="handleClick(item.name)">
      <van-button type="danger" size="small" plain @click.stop="handleDelete(item)">
        删除
      </van-button>
    </van-cell>
  </van-list>
</template>

<script>

import moment from 'moment'
import { Dialog } from 'vant'
import { textStorageService, textStorageListService } from './service'

moment.locale('zh-cn')

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
        const res = await textStorageListService.get()
        this.list = res.map((item) => {
          if (!item.updateTime) {
            return item
          }
          const updateTime = moment(item.updateTime)
          // TODO 把这个逻辑移动到更底层的组件去做，这样可以支持刷新时间
          const updateTimeText = updateTime.diff(moment().startOf('day')) > 0
            ? updateTime.fromNow()
            : updateTime.format('lll')
          return {
            ...item,
            updateTimeText
          }
        })
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
