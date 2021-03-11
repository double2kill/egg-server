<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="_id" label="_id" />
      <el-table-column prop="user_id" label="user_id" />
      <el-table-column prop="updated_at" label="updated_at" />
      <el-table-column prop="created_at" label="created_at" />
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="`查看详情 - ${detail.user_id}`"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      top="5vh"
      width="75%"
      center
    >
      <pre class="code-preview">{{ detail.content }}</pre>
    </el-dialog>
  </div>
</template>

<script>
import { MONGODB_SERVER_URL } from '@/constants'
import axios from 'axios'
import moment from 'moment'
moment.locale('zh-cn')

export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      detail: {}
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const result = await axios.get(MONGODB_SERVER_URL, {
        projection: 'user_id',
        withCredentials: true
      })
      this.tableData = result.data.map((item) => {
        return {
          ...item,
          updated_at: moment(item.updated_at).format('lll'),
          created_at: moment(item.created_at).format('lll')
        }
      })
    },
    handleClick(row) {
      this.dialogVisible = true
      this.detail = {
        user_id: row.user_id,
        content: JSON.stringify(row.github_info, null, 2)
      }
    }
  }
}
</script>

<style>
.code-preview {
  overflow: hidden;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.el-dialog .el-dialog__body {
  max-height: calc(90vh - 74px);
  overflow: hidden;
  overflow-y: auto;
}
</style>
