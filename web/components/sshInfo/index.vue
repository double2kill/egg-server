<template>
  <div>
    用户
    <el-select v-model="user" clearable placeholder="请选择用户" @change="handleSelect">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <!--为echarts准备一个具备大小的容器dom-->
    <div id="sshInfo" style="max-width: 800px; width: 100%; height: 400px; margin: 0 auto;" />
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
  async created() {
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
/* h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
} */
</style>
