<template>
  <div>
    <RouteNav
      v-if="current==='Index'"
      :select-page="selectPage"
      :saved-checked="savedChecked"
      :submited-checked="submitedChecked"
    />
    <Form
      v-else-if="current==='Form'"
      :show-result="showResult"
      :saved-checked="savedChecked"
    />
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
      savedChecked: [],
      submitedChecked: [],
      selectedCharacterList: []
    }
  },
  mounted() {
    const savedQuestionareData = localStorage.getItem('savedQuestionareData')
    if (savedQuestionareData) {
      this.savedChecked = JSON.parse(savedQuestionareData)
    }
    const submitedQuestionareData = localStorage.getItem('submitedQuestionareData')
    if (submitedQuestionareData) {
      this.submitedChecked = JSON.parse(submitedQuestionareData)
      this.setSelectedCharacterList(this.submitedChecked)
    }
  },
  methods: {
    selectPage(page) {
      if (page === 'Restart') {
        this.savedChecked = []
        this.current = 'Form'
      } else if (page === 'Continue') {
        this.current = 'Form'
      } else {
        this.current = page
      }
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
