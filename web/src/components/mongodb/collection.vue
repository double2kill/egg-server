<template>
  <div>

    <div style="margin: 15px 0;text-align: left;">
      <el-button size="medium" @click="fetchData()">刷新</el-button>
      <el-button size="medium" @click="handleAdd()" type="primary">新增</el-button>
    </div>

    <el-table
      border
      :data="collections"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="collection名">
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型">
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handlePageChange"
      layout="prev, pager, next"
      :current-page="pagination.currentPage"
      :page-size="pagination.pageSize"
      :total="1">
    </el-pagination>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  data() {
    // 初始化数据。？如何懒加载？
    return {
      pagination: {
        currentPage: 1,
        pageSize: 10
      },
      collections: []
    }
  },
  apollo: {
    collections() {
      return {
        // 这个传参数是不是很奇怪
        query: gql`query getList($limit: Int, $offset:Int) {
          collections(limit: $limit, offset: $offset) {
            name
            type
          }
        }`,
        mutation: {
          deleteJob(id) { id }
        }
      }
    },
  },
  methods: {
    async handlePageChange(page) {
      const limit = this.pagination.pageSize
      const offset = limit * (page - 1)
      this.pagination.currentPage = page
      await this.$apollo.queries.collections.refetch({ limit, offset })
    },
    async fetchData() {
      await this.handlePageChange(this.pagination.currentPage)
    },
  }
}
</script>