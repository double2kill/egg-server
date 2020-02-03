<template>
  <div class="route-navigation">
    <md-button @click="selectPage('Form')" type="default" plain size="small">
      开始测试
    </md-button>
    <md-button type="default" plain size="small">
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
    padding: 15px;
  }
  .md-button {
    margin-bottom: 15px;
  }
</style>
