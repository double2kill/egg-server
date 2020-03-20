<template>
  <van-uploader
    v-model="fileList"
    accept="*"
    max-count="1"
    :preview-full-image="false"
    :after-read="afterRead"
    :before-read="beforeRead"
    :before-delete="beforeDelete"
    @click-preview="clickPreview"
  />
</template>

<script>
import { EGG_SERVER } from '@/constants'
import { Dialog, Toast } from 'vant'
import axios from 'axios'

export default {
  props: {
    fileNameList: {
      default: () => [],
      type: Array
    },
    updateFileNameList: {
      default: () => {},
      type: Function
    }
  },
  data() {
    return {
      lastFileNameList: [],
      fileList: [],
      limitSize: 10,
      uploadUrl: `${EGG_SERVER}/v0.1/upload`
    }
  },
  watch: {
    fileNameList(val) {
      if (val[0] !== this.lastFileNameList[0]) {
        const newNameList = val.map((name) => {
          return {
            file: {
              name
            },
            url: `${EGG_SERVER}/public/${name}`
          }
        })
        this.fileList = newNameList
        this.lastFileNameList = val
      }
    }
  },
  methods: {
    async afterRead(file, detail) {
      file.status = 'uploading'
      file.message = '上传中...'
      const param = new FormData() // 创建form对象
      param.append('file', file.file)// 通过append向form对象添加数据
      try {
        await axios.post(`${EGG_SERVER}/v0.1/upload`, param, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        file.status = 'success'
        file.message = '上传失败'
        this.handleSuccess(file.file)
      } catch (error) {
        file.status = 'failed'
        file.message = '上传失败'
      }
    },
    clickPreview(file) {
      window.open(file.url)
    },
    beforeDelete(file) {
      return Dialog.confirm({
        title: '删除',
        message: `确定移除 ${file.file.name}？`
      }).then(() => {
        this.handleRemove()
      })
    },
    beforeRead(file) {
      const isLt10M = file.size / 1024 / 1024 < this.limitSize
      if (!isLt10M) {
        Toast.fail(`上传文件大小不能超过 ${this.limitSize}MB!`)
      }
      return isLt10M
    },
    handleSuccess(file) {
      const fileNameList = [file.name]
      this.lastFileNameList = fileNameList
      this.updateFileNameList(fileNameList)
    },
    handleRemove() {
      const fileNameList = []
      this.lastFileNameList = fileNameList
      this.updateFileNameList(fileNameList)
    }
  }
}
</script>

<style scoped>
  .upload-btn {
    width: 100%;
    max-width: 400px;
  }
</style>
