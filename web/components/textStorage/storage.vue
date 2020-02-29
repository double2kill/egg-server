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
        <van-button slot="button" size="small" @click="handleClear">
          清空
        </van-button>
      </van-field>
    </van-cell-group>
    <div class="submit-group">
      <van-button @click="handleCopy">
        复制
      </van-button>
      <van-button type="primary" @click="submitText">
        提交
      </van-button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { textStorageService, textStorageListService } from './service'

const defaultStorageName = '默认仓库'
const TEXT_STORAGE_STORAGE_NAME = 'textStorage.storageName'

export default {
  name: 'Storage',
  props: {
    storageNameFromList: {
      default: () => '',
      type: String
    }
  },
  data() {
    return {
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
  mounted() {
    const storageName = localStorage.getItem(TEXT_STORAGE_STORAGE_NAME) || defaultStorageName
    this.storageName = storageName
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
        this.text = res
      } catch (error) {
        Toast.fail('服务器出错')
        throw new Error('服务器出错')
      }
    },
    async submitText() {
      try {
        const storageName = this.getStorageName()
        await textStorageService.post(storageName, this.text)
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

      let storageList = await textStorageListService.get()
      if (!Array.isArray(storageList)) {
        storageList = []
      }
      storageList = storageList.filter(item => item.name !== storageName)
      storageList.unshift(storageData)

      await textStorageListService.post(storageList)
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
</style>
