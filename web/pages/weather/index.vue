<script setup lang="ts">
import WeatherPage from "@/components/weather/index.vue";
import head from "@/utils/getHead";
import { ref } from "vue";

definePageMeta({
  ssr: false,
});

interface WeatherItem {
  id: string;
  temperature: number;
  humidity: number;
  description: string;
  city: string;
}

const weatherData = ref<WeatherItem[]>([]);

try {
  // 使用服务器API路由
  const { data } = await useFetch<WeatherItem[]>("/api/weathers");
  weatherData.value = data.value || [];
} catch (error) {
  console.error("获取天气数据失败:", error);
}

defineOptions({
  head,
});
</script>

<template>
  <WeatherPage :weather-data="weatherData" />
</template>
