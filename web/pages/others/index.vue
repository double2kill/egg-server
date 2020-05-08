<template>
  <Links :links="links" />
</template>

<script>
import Links from '~/components/links'
import head from '@/utils/getHead'
import { othersLinks } from '@/constants'

export default {
  components: {
    Links
  },
  head,
  data() {
    return {
      links: othersLinks
    }
  }
}
</script>
