<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="备注">
      <el-input v-model="form.remark" />
    </el-form-item>
    <el-form-item label="城市名称">
      <el-input v-model="form.cityName" />
    </el-form-item>
    <el-form-item label="用户">
      <el-input v-model="form.users" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button @click="handleBack">
        返回
      </el-button>
      <el-button type="primary" @click="onSubmit">
        提交
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'WebForm',
  data() {
    return {
      id: '',
      form: {
        remark: '',
        cityName: '',
        users: ''
      }
    }
  },
  apollo: {
    weatherJobs() {
      return {
        // 这个传参数是不是很奇怪
        query: gql`query getList($limit: Int, $offset:Int, $id: ID){
          weatherJobs(limit: $limit, offset: $offset, id: $id) {
            count,
            items {
              id,
              remark,
              users,
              cityName
            }
          }
        }`
        // mutation: {
        //   deleteJob(id) { id }
        // }
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async onSubmit() {
      this.form.users = ['刘晨']
      if (this.id) {
        await this.$apollo.mutate({
        // Query
          mutation: gql`mutation ($remark: String!, $cityName: String!, $users: [String]!, $id: ID!) {
            editJob(remark: $remark, cityName: $cityName, users: $users, id: $id) {
              ok
            }
          }`,
          variables: {
            ...this.form,
            id: this.id
          }
        })
      } else {
        await this.$apollo.mutate({
          // Query
          mutation: gql`mutation ($remark: String!, $cityName: String!, $users: [String]!) {
            createJob(remark: $remark, cityName: $cityName, users: $users) {
              id
            }
          }`,
          variables: this.form
        })
      }
      this.$router.go(-1)
    },
    handleBack() {
      this.$router.go(-1)
    },
    async fetchData() {
      const { params } = this.$router.history.current
      if (params.id === undefined) {
        return
      }
      this.id = params.id
      const { data: { weatherJobs } } = await this.$apollo.queries.weatherJobs.refetch({ id: params.id })
      this.form = weatherJobs.items[0]
    }
  }
}
</script>
