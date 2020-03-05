<template>
  <div>
    <div style="margin: 15px 0;text-align: left;">
      <el-button size="medium" @click="fetchData()">
        刷新
      </el-button>
      <el-button size="medium" type="primary" @click="handleAdd()">
        新增
      </el-button>
    </div>

    <el-table
      :data="weatherJobs.items"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="id"
      />
      <el-table-column
        prop="remark"
        label="备注"
      />
      <el-table-column
        prop="users"
        label="用户"
      >
        <template slot-scope="scope">
          <el-tag v-for="(user, index) in scope.row.users" :key="index" size="medium">
            {{ user }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="cityName"
        label="城市"
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="100"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.row)">
            编辑
          </el-button>
          <el-button type="text" size="small" @click="handleDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="pagination.currentPage"
      :page-size="pagination.pageSize"
      :total="weatherJobs.count"
      layout="prev, pager, next"
      @current-change="handlePageChange"
    />
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  props: {
    changeRoute: {
      default: () => {},
      type: Function
    }
  },
  data() {
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
  mounted() {
    this.fetchData()
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
        }`
      }
    }
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
          id
        }
      })
      await this.fetchData()
    },
    async fetchData() {
      await this.handlePageChange(this.pagination.currentPage)
    },
    handleAdd() {
      this.changeRoute('Form')
    },
    handleEdit(item) {
      this.changeRoute('Form', {
        id: item.id
      })
    }
  }
}
</script>
