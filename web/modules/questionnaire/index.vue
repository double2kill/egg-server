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
  methods: {
    selectPage(page) {
      this.current = page
    },
    showResult(checked) {
      const selectedCharacterList = checked.map((item) => {
        const checkedIndex = +item - 1
        const character = questions[checkedIndex] && questions[checkedIndex].character
        return character
      })
      this.selectedCharacterList = selectedCharacterList
      this.current = 'Result'
    }
  }
}

</script>
