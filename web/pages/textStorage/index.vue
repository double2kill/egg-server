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
      title: '临时存储区'
    }
  }
}
</script>
