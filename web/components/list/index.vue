<template>
  <div>

    <div style="margin: 15px 0;text-align: left;">
      <el-button size="medium" @click="fetchData()">刷新</el-button>
      <el-button size="medium" @click="handleAdd()" type="primary">新增</el-button>
    </div>

    <el-table
      border
      :data="weatherJobs.items"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="id">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注">
      </el-table-column>
      <el-table-column
        prop="users"
        label="用户">
      </el-table-column>
      <el-table-column
        prop="cityName"
        label="城市">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handlePageChange"
      layout="prev, pager, next"
      :current-page="pagination.currentPage"
      :page-size="pagination.pageSize"
      :total="weatherJobs.count">
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
      weatherJobs: {
        count: 10,
        items: []
      }
    }
  },
  apollo: {
    weatherJobs() {
      return {
        // 这个传参数是不是很奇怪
        query: gql`query getList($limit: Int, $offset:Int){
          weatherJobs(limit: $limit, offset: $offset) {
            count,
            items {
              id,
              remark,
              users,
              cityName
            }
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
      await this.$apollo.queries.weatherJobs.refetch({ limit, offset })
    },
    async handleDelete({ id }) {
      // 考虑两个请求是否要统一起来
      await this.$apollo.mutate({
        // Query
        mutation: gql`mutation ($id: ID!) {
          deleteJob(id: $id) {
            id
          }
        }`,
        variables: {
          id,
        },
      })
      // 是否要加入事务的处理
      await this.fetchData()
    },
    async fetchData() {
      await this.handlePageChange(this.pagination.currentPage)
    },
    handleAdd() {
      this.$router.push({
        path: "/list/tableAdd"
      });
    },
    handleEdit(item) {
      this.$router.push({
        name: "list/table",
        params: {
          id: item.id
        }
      });
    }
  }
}
</script>