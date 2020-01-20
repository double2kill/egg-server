<template>
  <div>
    <md-field :title="title" class="md-example-child">
      <md-check-list
        v-model="checked"
        :options="questions"
        icon-position="left"
      />
    </md-field>
    <md-action-bar :actions="data" />
  </div>
</template>

<script>
import { Field, CheckList, ActionBar, Toast } from 'mand-mobile'
import data from './data'
const { title, questions } = data

export default {
  components: {
    [Field.name]: Field,
    [CheckList.name]: CheckList,
    [ActionBar.name]: ActionBar
  },
  props: {
    showResult: {
      default() {},
      type: Function
    }
  },
  data() {
    return {
      title,
      checked: [],
      questions,
      data: [{
        text: '保存',
        onClick: this.handleSave
      },
      {
        text: '提交',
        onClick: this.handleSubmit
      }]
    }
  },
  methods: {
    handleSave() {
      Toast.succeed('Save')
    },
    handleSubmit() {
      this.showResult(this.checked)
    }
  }
}

</script>

<style scoped>
.md-example-child {
  padding-bottom: 140px;
}
</style>
