<template>
  <TextStoragePage />
</template>

<script>
import TextStoragePage from '~/components/textStorage'

export default {
  components: {
    TextStoragePage
  },
  head() {
    return {
      title: '文字收集仓'
    }
  }
}
</script>
