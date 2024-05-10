<template>
  <div class="todolist">
    <el-tree
      ref="tree"
      :data="data"
      :default-checked-keys="initialCheckedKeys"
      show-checkbox
      node-key="id"
    >
      <span slot-scope="{ node }">
        <span :class="{ 'line-through': node.checked }">{{ node.label }}</span>
      </span>
    </el-tree>
    <el-button type="primary" @click="handleClick"> 保存 </el-button>
  </div>
</template>

<script>
import URL from "../../constants";
import { originData, formatData } from "./data";

export default {
  data() {
    return {
      initialCheckedKeys: [],
      data: formatData(originData),
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async handleClick() {
      const checkedKeys = this.$refs.tree.getCheckedKeys();
      await $fetch(`${URL.CMD}/todo_list`, {
        method: "POST",
        body: {
          data: {
            checkedKeys,
            todoList: originData,
          },
          update_time: new Date().valueOf(),
        },
      });
      this.$message({
        showClose: true,
        message: "恭喜你，保存成功了！",
        type: "success",
      });
    },
    async fetchData() {
      const response = await $fetch(`${URL.CMD}/todo_list`, {
        params: {
          _sort: "update_time",
          _order: "desc",
        },
      });
      const { data } = response;
      const { checkedKeys } = data[0].data;
      this.$refs.tree.setCheckedKeys(checkedKeys);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.todolist {
  max-width: 400px;
  margin: 0 auto;
}
.line-through {
  text-decoration: line-through;
}
</style>
