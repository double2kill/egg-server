<template>
  <div class="sshInfo">
    用户
    <el-select v-model="user" clearable placeholder="请选择用户" @change="handleSelect">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <div id="sshInfo" class="echart" />
  </div>
</template>

<script>
import echarts from 'echarts'
import axios from 'axios'
import { EGG_SERVER } from '~/constants'
import { getOptions } from './helper'

export default {
  name: '',
  data() {
    return {
      charts: '',
      options: [
        {
          value: 'liuchen',
          label: '刘晨'
        },
        {
          value: 'Mikelian',
          label: '连学军'
        },
        {
          value: 'John',
          label: 'John'
        },
        {
          value: 'hizon',
          label: 'hizon'
        },
        {
          value: 'root',
          label: 'root'
        }
      ],
      user: 'liuchen'
    }
  },
  async mounted() {
    const user = 'liuchen'
    await this.getInfo(user)
  },
  methods: {
    drawEcharts(id, data, user) {
      this.charts = echarts.init(document.getElementById(id))
      const options = getOptions(data || [], user)
      this.charts.setOption(options)
    },
    handleSelect(user) {
      if (user) {
        this.getInfo(user)
      }
    },
    async getInfo(user) {
      const result = await axios.get(`${EGG_SERVER}/v0.1/sshInfo`, {
        params: {
          user
        }
      })
      this.drawEcharts('sshInfo', result.data, user)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sshInfo {
  text-align: center;
  padding: 15px;
}
.echart {
  max-width: 800px;
  width: 100%;
  height: 400px;
  margin: 0 auto;
}
</style>
