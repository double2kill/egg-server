<template>
  <div>11</div>
</template>

<script>
import { MONGODB_SERVER_URL } from '@/constants'
import axios from 'axios'

export default {
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      axios.get(MONGODB_SERVER_URL, {
        projection: 'user_id',
        withCredentials: true
      })
    }
  }
}
</script>

<style>

</style>
