<script setup lang="ts">
import * as echarts from "echarts";
import { getEchartOptions } from "./helper";
import { ref, onMounted, nextTick } from "vue";

interface WeatherItem {
  id: string;
  city: string;
  temperature: number;
  humidity: number;
  description: string;
}

const props = defineProps<{
  weatherData: WeatherItem[];
}>();

const charts = ref<echarts.ECharts>();
const city = ref("大田");
const options = [
  { value: "大田", label: "大田" },
  { value: "福州", label: "福州" },
  { value: "厦门", label: "厦门" },
];

const drawWeather = (cityName: string) => {
  const data = props.weatherData.filter((item) => item.city === cityName);
  const title = `${cityName}历史天气`;
  const options = getEchartOptions(data, title);
  charts.value?.setOption(options);
};

const handleChange = (cityName: string) => {
  drawWeather(cityName);
};

onMounted(() => {
  const chartDom = document.getElementById("echart");
  console.log(chartDom, "chartDom");
  if (chartDom) {
    charts.value = echarts.init(chartDom, "light");
    drawWeather("大田");
  }
});

onUnmounted(() => {
  charts.value?.dispose();
});
</script>

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
