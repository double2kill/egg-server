<template>
  <div class="route-navigation">
    <md-button @click="selectPage('Form')" type="default" plain size="small">
      开始测评
    </md-button>
    <md-button @click="selectPage('Result')" type="default" plain size="small">
      查看结果
    </md-button>
  </div>
</template>

<script>
import { Button } from 'mand-mobile'

export default {
  name: 'ButtonDemo',
  components: {
    [Button.name]: Button
  },
  props: {
    selectPage: {
      default() {},
      type: Function
    }
  }
}
</script>

<style>
  .route-navigation {
    padding: 30px;
  }
  .md-button {
    margin-bottom: 30px;
  }
</style>
