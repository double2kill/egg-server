<template>
  <div class="todolist">
    <el-tree
      ref="tree"
      :data="data"
      show-checkbox
      node-key="id"
      :default-checked-keys="initialCheckedKeys"
    >
      <span slot-scope="{ node }">
        <span v-bind:class="{ 'line-through': node.checked }">{{
          node.label
        }}</span>
      </span>
    </el-tree>
    <el-button type="primary" @click="handleClick">保存</el-button>
  </div>
</template>

<script>
import { originData, formatData } from "./data";
import axios from "axios";
import URL from "../../constants";

export default {
  data() {
    return {
      initialCheckedKeys: [],
      data: formatData(originData),
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async handleClick() {
      const checkedKeys = this.$refs.tree.getCheckedKeys();
      await axios.post(`${URL.CMD}/todo_list`, {
        data: {
          checkedKeys,
          todoList: originData
        },
        update_time: new Date().valueOf()
      });
      this.$message({
        showClose: true,
        message: "恭喜你，保存成功了！",
        type: "success"
      });
    },
    async fetchData() {
      const response = await axios.get(`${URL.CMD}/todo_list`, {
        params: {
          _sort: "update_time",
          _order: "desc"
        }
      });
      const { data } = response;
      const { checkedKeys } = data[0].data;
      this.$refs.tree.setCheckedKeys(checkedKeys);
    }
  }
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