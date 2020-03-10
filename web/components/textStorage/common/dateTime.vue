<template>
  <span>{{ rendertimeText() }}</span>
</template>

<script>
import moment from 'moment'
moment.locale('zh-cn')

export default {
  props: {
    value: {
      default: () => 0,
      type: Number
    }
  },
  date() {
    return {
      timeoutId: null
    }
  },
  mounted() {
    this.setTimeoutRender()
  },
  beforeDestroy() {
    clearInterval(this.timeoutId)
  },
  methods: {
    valueIsToday() {
      const momentValue = moment(this.value)
      return momentValue.diff(moment().startOf('day')) > 0
    },
    setTimeoutRender() {
      if (!this.valueIsToday()) {
        return
      }
      const momentValue = moment(this.value)
      const minutesDiff = moment().diff(momentValue, 'minutes')
      const time = minutesDiff < 45 ? 60 * 1000 : 60 * 60 * 10000
      this.timeoutId = setTimeout(() => {
        this.$forceUpdate()
        this.setTimeoutRender()
        clearInterval(this.timeoutId)
      }, time)
    },
    rendertimeText() {
      const momentValue = moment(this.value)
      const timeText = this.valueIsToday()
        ? momentValue.fromNow()
        : momentValue.format('lll')
      return timeText
    }
  }
}
</script>
