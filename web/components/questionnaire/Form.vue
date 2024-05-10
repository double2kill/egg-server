<template>
  <div>
    <md-field :title="title" class="md-example-child">
      <md-check-list
        v-model="checked"
        :options="questions"
        icon-position="left"
      />
    </md-field>
    <md-action-bar :actions="data" class="action-bar" size="small" />
  </div>
</template>

<script>
import { Field, CheckList, ActionBar, Toast } from "mand-mobile-next";
import data from "./data";
const { title, questions } = data;

export default {
  components: {
    [Field.name]: Field,
    [CheckList.name]: CheckList,
    [ActionBar.name]: ActionBar,
  },
  props: {
    savedChecked: {
      default: () => [],
      type: Array,
    },
    showResult: {
      default() {},
      type: Function,
    },
  },
  data() {
    return {
      title,
      checked: [],
      questions,
      data: [
        {
          text: "保存",
          onClick: this.handleSave,
        },
        {
          text: "提交",
          onClick: this.handleSubmit,
        },
      ],
    };
  },
  mounted() {
    this.checked = this.savedChecked;
  },
  methods: {
    handleSave() {
      localStorage.setItem(
        "savedQuestionareData",
        JSON.stringify(this.checked)
      );
      Toast.succeed("保存成功");
    },
    handleSubmit() {
      localStorage.setItem(
        "submitedQuestionareData",
        JSON.stringify(this.checked)
      );
      this.showResult(this.checked);
    },
  },
};
</script>

<style>
.md-example-child {
  padding: 30px;
  padding-bottom: 140px;
}
.md-example-child .md-cell-item-body.multilines {
  padding-top: 16px;
  padding-bottom: 16px;
}
.md-example-child .md-cell-item-left {
  margin-right: 20px;
}

.md-example-child .md-cell-item-brief {
  margin-top: 0px;
}

.action-bar .md-button {
  height: 64px;
  line-height: 64px;
  margin-bottom: 0px;
}
.action-bar .md-button-inner {
  font-size: 28px;
}
</style>
