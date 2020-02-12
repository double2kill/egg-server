<template>
  <div>
    <van-nav-bar
      title="文字收集仓"
    />
    <div>
      <van-cell-group>
        <van-field v-model="storageName" placeholder="请输入你喜欢的仓库名" label="仓库名">
          <van-button slot="button" size="small" @click="handleChangeStorageName">
            修改
          </van-button>
        </van-field>
        <van-field
          v-model="text"
          placeholder="请输入文字"
          label="仓库文字"
          rows="1"
          autosize
          type="textarea"
          clearable
        />
      </van-cell-group>
      <div class="submit-group">
        <van-button @click="handleCopy()">
          复制
        </van-button>
        <van-button type="primary" @click="submitText()">
          提交
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import axios from 'axios'
import URL from '../../constants'

const SPAIR = URL.SPAIR

const defaultStorageName = '默认仓库'
const TEXT_STORAGE_STORAGE_NAME = 'textStorage.storageName'

export default {
  name: 'TextStorage',
  data() {
    return {
      storageName: defaultStorageName,
      text: ''
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
        const res = await axios.get(`${SPAIR}/textStorage/${storageName}`)
        this.text = decodeURIComponent(res.data)
      } catch (error) {
        Toast.fail('服务器出错')
        throw new Error('服务器出错')
      }
    },
    async submitText() {
      try {
        // encodeURIComponent twice
        const storageName = this.getStorageName()
        const text = encodeURIComponent(encodeURIComponent(this.text))
        await axios.get(`${SPAIR}/textStorage/${storageName}/${text}`)
        Toast.success('保存成功')
      } catch (error) {
        Toast.fail('保存失败')
      }
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
    async handleChangeStorageName() {
      await this.getText()
      localStorage.setItem(TEXT_STORAGE_STORAGE_NAME, this.storageName)
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
