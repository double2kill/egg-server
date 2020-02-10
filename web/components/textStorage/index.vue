<template>
  <md-field>
    <md-textarea-item
      v-model="text"
      :autosize="true"
      :rows="1"
      clearable
      placeholder="请输入文字"
      :max-height="500"
    />
    <md-button class="submit-button" inline size="small" @click="handleCopy()">
      复制
    </md-button>
    <md-button class="submit-button" type="primary" inline size="small" @click="submitText()">
      提交
    </md-button>
  </md-field>
</template>

<script>
import { Button, TextareaItem, Field, Toast } from 'mand-mobile'

import axios from 'axios'
import URL from '../../constants'

const SPAIR = URL.SPAIR

export default {
  name: 'TextStorage',
  components: {
    [Button.name]: Button,
    [TextareaItem.name]: TextareaItem,
    [Field.name]: Field
  },
  data() {
    return {
      text: ''
    }
  },
  created() {
    this.getText()
  },
  methods: {
    async getText() {
      try {
        const res = await axios.get(`${SPAIR}/ns/liuchen`)
        this.text = decodeURIComponent(res.data)
      } catch (error) {
        Toast.succeed('服务器出错')
      }
    },
    async submitText() {
      try {
        // encodeURIComponent twice
        const text = encodeURIComponent(encodeURIComponent(this.text))
        await axios.get(`${SPAIR}/ns/liuchen/${text}`)
        Toast.succeed('保存成功')
      } catch (error) {
        Toast.succeed('保存失败')
      }
    },
    handleCopy() {
      const tempInput = document.createElement('input')
      tempInput.setAttribute('value', this.text)
      document.body.appendChild(tempInput)
      tempInput.select()
      document.execCommand('copy')
      document.body.removeChild(tempInput)
      Toast.succeed('复制成功')
    }
  }
}

</script>

<style scoped>
  .submit-button {
    margin-top: 15px;
  }
</style>
