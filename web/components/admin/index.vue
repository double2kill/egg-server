<template>
  <el-table
    :data="tableData"
    style="width: 100%"
  >
    <el-table-column
      label="key"
      width="180"
    >
      <template slot-scope="scope">
        <el-tag size="medium">
          {{ scope.row.key }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column
      label="value"
    >
      <template slot-scope="scope">
        {{ scope.row.value }}
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)"
        >
          编辑
        </el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
        >
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import SpairService from '~/utils/SpairService'
export const textStorageService = new SpairService('textStorage')

export default {
  data() {
    return {
      tableData: []
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      try {
        this.tableData = await textStorageService.list()
      } catch (error) {
        this.$message({
          showClose: true,
          message: '服务器出错',
          type: 'error'
        })
      }
    },
    handleEdit() {
      this.$message('尽情期待')
    },
    handleDelete() {
      this.$message('尽情期待')
    }
  }
}
</script>
