<template>
  <div>
    <van-cell-group>
      <van-field ref="storageName" v-model="storageName" placeholder="请输入你喜欢的仓库名" label="仓库名">
        <van-button slot="button" size="small" @click="handleChangeStorageName">
          切换
        </van-button>
      </van-field>
      <van-field
        ref="storageText"
        v-model="text"
        placeholder="请输入文字"
        label="仓库文字"
        rows="1"
        autosize
        type="textarea"
      >
        <div slot="button" class="button-box">
          <van-button size="small" @click="handleClear">
            清空
          </van-button>
          <van-button type="primary" plain size="small" @click="handleCopy">
            复制
          </van-button>
        </div>
      </van-field>
      <van-field
        label="图片"
      >
        <div slot="input" class="upload-box">
          <Upload :file-name-list="fileNameList" :update-file-name-list="updateFileNameList" />
        </div>
      </van-field>
    </van-cell-group>
    <div class="submit-group">
      <van-button type="primary" @click="submitText">
        提交
      </van-button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { textStorageService, textStorageListService } from './service'
import { TEXT_STORAGE_STORAGE_NAME, defaultStorageName } from './data'
import Upload from './common/upload'

export default {
  name: 'Storage',
  components: {
    Upload
  },
  props: {
    storageNameFromList: {
      default: () => '',
      type: String
    }
  },
  data() {
    return {
      fileNameList: [],
      storageName: defaultStorageName,
      text: ''
    }
  },
  watch: {
    storageNameFromList(val) {
      if (val === 'add') {
        this.storageName = ''
        this.text = ''
        this.$refs.storageName.focus()
        return
      }
      this.storageName = val
      this.getText()
    }
  },
  async mounted() {
    const list = await textStorageListService.get()
    this.storageName = list.length > 0 ? list[0].name : defaultStorageName
    this.getText()
  },
  methods: {
    getStorageName() {
      return this.storageName || defaultStorageName
    },
    async getText() {
      const storageName = this.getStorageName()
      try {
        const res = await textStorageService.get(storageName)
        let resData
        try {
          resData = JSON.parse(res)
        } catch (error) {
          resData = res
        }
        if (typeof resData === 'object') {
          this.text = resData.text
          this.fileNameList = resData.fileNameList
        } else {
          this.text = res
          this.fileNameList = []
        }
      } catch (error) {
        Toast.fail('服务器出错')
        throw new Error('服务器出错')
      }
    },
    async submitText() {
      try {
        const storageName = this.getStorageName()
        let data = this.text
        if (this.fileNameList.length > 0) {
          data = JSON.stringify({
            text: this.text,
            fileNameList: this.fileNameList
          })
        }
        await textStorageService.post(storageName, data)
        Toast.success('保存成功')
        localStorage.setItem(TEXT_STORAGE_STORAGE_NAME, this.storageName)
        this.updateStorageList(storageName)
      } catch (error) {
        Toast.fail('保存失败')
      }
    },
    async updateStorageList(storageName) {
      const storageData = {
        name: storageName,
        updateTime: new Date().valueOf()
      }
      await textStorageListService.post(storageData)
    },
    handleCopy() {
      const tempInput = document.createElement('input')
      tempInput.setAttribute('value', this.text)
      document.body.appendChild(tempInput)
      tempInput.select()
      document.execCommand('copy')
      document.body.removeChild(tempInput)
      Toast.success('复制成功')
    },
    handleClear() {
      this.text = ''
      this.$refs.storageText.focus()
    },
    async handleChangeStorageName() {
      await this.getText()
    },
    updateFileNameList(fileNameList) {
      this.fileNameList = fileNameList
    }
  }
}

</script>

<style>
  .van-cell {
    align-items: center;
  }
  .submit-group {
    padding: 16px;
    text-align: right;
  }
  .button-box {
    display: flex;
    flex-direction: column;
  }
  .button-box button+button {
    margin-top: 10px;
  }
  .upload-box {
    text-align: center;
  }
</style>
