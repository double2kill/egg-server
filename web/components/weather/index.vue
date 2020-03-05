<template>
  <!--为echarts准备一个具备大小的容器dom-->
  <div id="main" style="max-width: 400px; width: 100%;height: 400px; margin: 0 auto;" />
</template>

<script>
import echarts from 'echarts'
import axios from 'axios'
import { getOptions } from './helper'
import { EGG_SERVER } from '@/constants'

export default {
  name: '',
  data() {
    return {
      charts: '',
      opinion: [],
      opinionData: []
    }
  },
  async created() {
    const result = await axios.get(`${EGG_SERVER}/v0.1/weathers`)
    this.drawEcharts('main', result.data)
  },
  methods: {
    drawEcharts(id, data) {
      this.charts = echarts.init(document.getElementById(id), 'light')
      const options = getOptions(data || [])
      this.charts.setOption(options)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
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
}
</style>
