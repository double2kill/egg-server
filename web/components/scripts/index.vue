<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>源数据</span>
        </div>
        <el-input
          v-model="list"
          type="textarea"
          autosize
          placeholder="请输入数据，用回车分割"
        />
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>复制代码</span>
          <el-button
            icon="el-icon-document-copy"
            type="text"
            @click="handleCopy"
          />
        </div>
        <div id="outputScript" style="white-space: pre-wrap; word-wrap: break-word" v-html="outputScriptWithStyle" />
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { targetScript } from './data'
export default {
  data() {
    return {
      list: ''
    }
  },
  computed: {
    outputScript() {
      let phoneNumberList = this.list.split('\n')
      phoneNumberList = phoneNumberList.filter(item => !!item)
      const phoneNumberListText = JSON.stringify(phoneNumberList)
      return `var phoneNumberList = ${phoneNumberListText}
${targetScript}
`
    },
    outputScriptWithStyle() {
      const [firstLine, ...rest] = this.outputScript.split('\n')
      return [`<span style="color: red">${firstLine}</span>`, ...rest].join('\n')
    }
  },
  methods: {
    handleCopy() {
      const text = document.getElementById('outputScript').textContent
      const tempInput = document.createElement('textarea')
      tempInput.value = text
      document.body.appendChild(tempInput)
      tempInput.select()
      document.execCommand('copy')
      document.body.removeChild(tempInput)
      this.$message.success('复制成功')
    }
  }
}
</script>
