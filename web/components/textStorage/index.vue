<template>
  <md-field>
    <md-textarea-item
      v-model="text"
      :autosize="true"
      :rows="1"
      placeholder="请输入文字"
    />
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
        await axios.get(`${SPAIR}/ns/liuchen`).then((res) => {
          this.text = res.data
        })
      } catch (error) {
        Toast.succeed('服务器出错')
      }
    },
    async submitText() {
      try {
        await axios.get(`${SPAIR}/ns/liuchen/${this.text}`)
        Toast.succeed('保存成功')
      } catch (error) {
        Toast.succeed('保存失败')
      }
    }
  }
}

</script>

<style scoped>
  .submit-button {
    margin-top: 15px;
  }
</style>
