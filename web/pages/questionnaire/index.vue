<template>
  <QuestionnairePage />
</template>

<script>
import QuestionnairePage from '~/modules/questionnaire'

export default {
  components: {
    QuestionnairePage
  },
  head() {
    return {
      title: '性格测评'
    }
  }
}
</script>
