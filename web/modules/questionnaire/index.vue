<template>
  <Form v-if="show" :show-result="showResult" />
  <Result v-else :selected-character-list="selectedCharacterList" />
</template>

<script>
import Form from './Form'
import Result from './Result'
import data from './data'
const { questions } = data

export default {
  name: 'CheckDemo',
  components: {
    Form,
    Result
  },
  data() {
    return {
      show: true,
      selectedCharacterList: []
    }
  },
  methods: {
    showResult(checked) {
      const selectedCharacterList = checked.map((item) => {
        const checkedIndex = +item - 1
        const character = questions[checkedIndex] && questions[checkedIndex].character
        return character
      })
      this.selectedCharacterList = selectedCharacterList
      this.show = false
    }
  }
}

</script>
