<template>
  <div class="result-page">
    <h1>你的性格是</h1>
    <template v-for="item in maxCharactorInfo">
      <md-result-page
        :key="item.id"
        class="customized"
        img-url="//manhattan.didistatic.com/static/manhattan/do1_JX7bcfXqLpStKRv31xlp"
        :text="item.name"
        :subtext="item.description"
      />
    </template>
  </div>
</template>

<script>
import { ResultPage } from 'mand-mobile'
import data from './data'

export default {
  components: {
    [ResultPage.name]: ResultPage
  },
  props: {
    selectedCharacterList: {
      default() {
        return []
      },
      type: Array
    }
  },
  computed: {
    maxCharactorInfo() {
      if (this.selectedCharacterList.length === 0) {
        return []
      }
      let maxCount = 0
      const countObj = this.selectedCharacterList.reduce((res, charactorId) => {
        const count = res[charactorId] || 0
        const currentCount = count + 1
        res[charactorId] = currentCount
        if (currentCount > maxCount) {
          maxCount = currentCount
        }
        return res
      }, {})

      const maxCharactorList = Object.entries(countObj)
        .filter(([charactorId, value]) => value === maxCount)
        .map(([charactorId, value]) => {
          const charactorIndex = +charactorId - 1
          return data.characterInfoList[charactorIndex] || {}
        })
      return maxCharactorList
    }
  }
}

</script>

<style scoped>
.result-page{
  padding: 40px;
}
</style>
