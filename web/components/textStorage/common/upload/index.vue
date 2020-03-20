<template>
  <el-button
    class="upload-btn"
  >
    <el-upload
      :on-preview="handlePreview"
      class="upload-demo"
      list-type="picture"
      :limit="1"
      :action="uploadUrl"
      :before-upload="beforeUpload"
      :before-remove="beforeRemove"
      :on-success="handleSuccess"
      :on-remove="handleRemove"
      :on-exceed="handleExceed"
      :file-list="fileList"
    >
      <el-button size="small" type="primary">
        点击上传
      </el-button>
      <div slot="tip" class="el-upload__tip">
        不超过{{ limitSize }}M
      </div>
    </el-upload>
  </el-button>
</template>

<script>
import { EGG_SERVER } from '@/constants'
import { Dialog, Toast } from 'vant'

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
            name,
            url: `${EGG_SERVER}/public/${name}`
          }
        })
        this.fileList = newNameList
        this.lastFileNameList = val
      }
    }
  },
  methods: {
    handleExceed(files, fileList) {
      Toast.fail(`只能上传一个文件`)
    },
    beforeRemove(file, fileList) {
      return Dialog.confirm({
        title: '删除',
        message: `确定移除 ${file.name}？`
      }).then(() => true)
    },
    beforeUpload(file) {
      const isLt10M = file.size / 1024 / 1024 < this.limitSize
      if (!isLt10M) {
        Toast.fail(`上传文件大小不能超过 ${this.limitSize}MB!`)
      }
      return isLt10M
    },
    handlePreview(file) {
      window.open(file.url)
    },
    handleSuccess(res, file, fileList) {
      const fileNameList = fileList.map(file => file.name)
      this.lastFileNameList = fileNameList
      this.updateFileNameList(fileNameList)
    },
    handleRemove(file, fileList) {
      const fileNameList = fileList.map(file => file.name)
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
