<template>
  <div class="result-page">
    <h1>你的性格是</h1>
    <md-result-page
      v-for="item in maxCharactorInfo"
      :key="item.id"
      :text="item.name"
      :subtext="item.description"
      class="customized"
    />
  </div>
</template>

<script>
import { ResultPage } from "mand-mobile-next";
import data from "./data";

export default {
  components: {
    [ResultPage.name]: ResultPage,
  },
  props: {
    selectedCharacterList: {
      default() {
        return [];
      },
      type: Array,
    },
  },
  computed: {
    maxCharactorInfo() {
      if (this.selectedCharacterList.length === 0) {
        return [];
      }
      let maxCount = 0;
      const countObj = this.selectedCharacterList.reduce((res, charactorId) => {
        const count = res[charactorId] || 0;
        const currentCount = count + 1;
        res[charactorId] = currentCount;
        if (currentCount > maxCount) {
          maxCount = currentCount;
        }
        return res;
      }, {});

      const maxCharactorList = Object.entries(countObj)
        .filter(([charactorId, value]) => value === maxCount)
        .map(([charactorId, value]) => {
          const charactorIndex = +charactorId - 1;
          return data.characterInfoList[charactorIndex] || {};
        });
      return maxCharactorList;
    },
  },
};
</script>

<style>
.result-page {
  padding: 40px;
}

.result-page .md-result-image {
  display: none;
}

.result-page .md-result-subtext {
  text-align: left;
  white-space: pre-wrap;
}
</style>
