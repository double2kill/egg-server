<template>
  <div>
    <RouteNav v-if="current==='Index'" :select-page="selectPage" />
    <Form v-else-if="current==='Form'" :show-result="showResult" />
    <Result v-else-if="current==='Result'" :selected-character-list="selectedCharacterList" />
  </div>
</template>

<script>
import Form from './Form'
import Result from './Result'
import RouteNav from './RouteNav'
import data from './data'
const { questions } = data

export default {
  name: 'CheckDemo',
  components: {
    Form,
    Result,
    RouteNav
  },
  data() {
    return {
      current: 'Index',
      selectedCharacterList: []
    }
  },
  mounted() {
    const submitedQuestionareData = localStorage.getItem('submitedQuestionareData')
    if (submitedQuestionareData) {
      this.checked = JSON.parse(submitedQuestionareData)
      this.setSelectedCharacterList(this.checked)
    }
  },
  methods: {
    selectPage(page) {
      this.current = page
    },
    setSelectedCharacterList(checked) {
      const selectedCharacterList = checked.map((item) => {
        const checkedIndex = +item - 1
        const character = questions[checkedIndex] && questions[checkedIndex].character
        return character
      })
      this.selectedCharacterList = selectedCharacterList
    },
    showResult(checked) {
      this.setSelectedCharacterList(checked)
      this.current = 'Result'
    }
  }
}

</script>
