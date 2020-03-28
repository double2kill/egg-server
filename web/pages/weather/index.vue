<template>
  <WeatherPage :weather-data="weatherData" />
</template>

<script>
import WeatherPage from '~/components/weather'
import { EGG_SERVER } from '@/constants'
import head from '@/utils/getHead'

export default {
  components: {
    WeatherPage
  },
  async asyncData({ $axios }) {
    return {
      weatherData: await $axios.$get(`${EGG_SERVER}/v0.1/weathers`)
    }
  },
  head
}
</script>
