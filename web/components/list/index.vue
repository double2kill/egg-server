<template>
  <div class="list-page">
    <Table v-if="route === 'Table'" :change-route="changeRoute" />
    <Form v-if="route === 'Form'" :change-route="changeRoute" :route-params="routeParams" />
  </div>
</template>

<script>
import Table from './table'
import Form from './Form'

export default {
  name: 'List',
  components: {
    Table,
    Form
  },
  data() {
    return {
      route: 'Table',
      routeParams: {}
    }
  },
  methods: {
    changeRoute(route, params) {
      this.route = route
      this.routeParams = params || {}
    }
  }
}
</script>

<style scoped>
  .list-page {
    margin: 15px;
  }
</style>
