<template>
  <div class="route-navigation">
    <md-button type="default" plain size="small" @click="selectPage('Restart')">
      {{ savedChecked.length > 0 ? '重新测评' : '开始测评' }}
    </md-button>
    <md-button v-if="savedChecked.length > 0" type="default" plain size="small" @click="selectPage('Continue')">
      继续测评
    </md-button>
    <md-button v-if="submitedChecked.length > 0" type="default" plain size="small" @click="selectPage('Result')">
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
    savedChecked: {
      default: () => [],
      type: Array
    },
    submitedChecked: {
      default: () => [],
      type: Array
    },
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
