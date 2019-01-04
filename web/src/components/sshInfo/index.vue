<template>
  <!--为echarts准备一个具备大小的容器dom-->
  <div id="main" style="max-width: 800px; width: 100%; height: 400px; margin: 0 auto;"></div>
</template>

<script>
import echarts from "echarts";
import { getOptions } from "./helper";
import axios from "axios";
import URL from '../../constants'

export default {
  name: "",
  data() {
    return {
      charts: "",
      opinion: [],
      opinionData: []
    };
  },
  methods: {
    drawEcharts(id, data) {
      this.charts = echarts.init(document.getElementById(id));
      const options = getOptions(data || []);
      this.charts.setOption(options);
    }
  },
  async created() {
    const result = await axios.get(`${URL.host}/v0.1/weathers`);
    this.drawEcharts("main", result.data);
  },
};
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
