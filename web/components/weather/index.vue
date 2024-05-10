<template>
  <div class="weather">
    <el-select v-model="city" placeholder="请选择城市" @change="handleChange">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <div id="echart" class="echart" />
  </div>
</template>

<script>
import * as echarts from "echarts";
import { getEchartOptions } from "./helper";

export default {
  name: "",
  props: {
    weatherData: {
      default: () => [],
      type: Array,
    },
  },
  data() {
    return {
      charts: "",
      city: "大田",
      options: [
        {
          value: "大田",
          label: "大田",
        },
        {
          value: "福州",
          label: "福州",
        },
        {
          value: "厦门",
          label: "厦门",
        },
      ],
    };
  },
  mounted() {
    this.charts = echarts.init(document.getElementById("echart"), "light");
    this.drawWeather("大田");
  },
  methods: {
    drawWeather(city) {
      const data = this.weatherData.filter((item) => item.city === city);
      const title = `${city}历史天气`;
      const options = getEchartOptions(data, title);
      this.charts.setOption(options);
    },
    handleChange(city) {
      this.drawWeather(city);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.weather {
  text-align: center;
  padding: 15px;
}
.echart {
  max-width: 400px;
  width: 100%;
  height: 400px;
  margin: 15px auto;
}
</style>
