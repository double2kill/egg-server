<template>
  <div class="md-example-child md-example-child-check md-example-child-check-4">
    <md-field :title="title">
      <md-check-list
        v-model="checked"
        :options="questions"
        icon-position="left"
      />
    </md-field>
  </div>
</template>

<script>
import { Field, CheckList } from 'mand-mobile'

export default {
  name: 'CheckDemo',
  components: {
    [Field.name]: Field,
    [CheckList.name]: CheckList
  },
  data() {
    return {
      title: '问卷测试',
      checked: ['1'],
      questions: [
        { value: '1', brief: '1.选项摘要描述选项摘要描述选项摘要描述选项摘要描述选项摘要描述选项摘要描述' },
        { value: '2', brief: '2.选项摘要描述' },
        { value: '3', brief: '3.选项摘要描述' },
        { value: '4', brief: '4.选项摘要描述' }
      ]
    }
  }
}

</script>

<style scoped>
.md-example-child {
    font-size: 28px;
}
</style>
