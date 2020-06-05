<template>
  <div class="admin">
    <span class="sub-title">namespace</span>
    <el-select
      v-model="namespace"
      filterable
      @change="handleSelectNamespace"
    >
      <el-option v-for="item in namespaceList" :key="item" :label="item" :value="item" />
    </el-select>
    <span class="sub-title">user</span>
    <el-select
      v-model="user"
      filterable
    >
      <el-option v-for="item in userList" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <el-button type="primary" style="float: right" @click="showEditDialog()">
      新增key
    </el-button>
    <el-table
      :data="tableData"
      style="width: 100%"
      :default-sort="{prop: 'update_time', order: 'descending'}"
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
      <el-table-column
        prop="update_time"
        label="更新时间"
        sortable
      >
        <template slot-scope="scope">
          <dateTime slot="label" :value="scope.row.update_time" />
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="360"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="showEditDialog(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="confirmDelete(scope.row.key)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <EditDialog
      :visible="dialogVisible"
      :edit-form="editForm"
      :close-dialog="closeDialog"
      :handle-edit="handleEdit"
    />
  </div>
</template>

<script>
import dateTime from '@/common/dateTime'
import EditDialog from './EditDialog'
import SpairService from '~/utils/SpairService'
import { SPAIR_NAMESPACE } from '~/constants'
const { admin: ADMIN, user: USER } = SPAIR_NAMESPACE

export default {
  components: {
    dateTime,
    EditDialog
  },
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      editForm: {},
      namespace: '',
      namespaceService: null,
      namespaceList: [],
      user: this.$store.state.user.username || '',
      userList: []
    }
  },
  watch: {
    user(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.fetchData()
      }
    }
  },
  mounted() {
    this.fetchNamespaceList()
    this.fetchUserList()
  },
  methods: {
    async fetchNamespaceList() {
      try {
        const adminService = new SpairService(ADMIN)
        const list = await adminService.get('namespace')
        if (Array.isArray(list)) {
          this.namespaceList = list
        } else {
          this.namespaceList = [ADMIN]
          this.$message({
            showClose: true,
            message: '服务器数据有误, 请检查admin.namespace的配置',
            type: 'error'
          })
        }
        const firstNamespace = this.namespaceList[0]

        this.handleSelectNamespace(firstNamespace)
      } catch (error) {
        this.$message({
          showClose: true,
          message: '服务器出错',
          type: 'error'
        })
      }
    },
    async fetchUserList() {
      try {
        const userService = new SpairService(USER)
        const list = await userService.list()
        let userList = list.map(item => ({ key: item.key, value: item.key }))
        const defaultUser = [{ label: '游客', value: '' }]
        userList = defaultUser.concat(userList)
        this.userList = userList
      } catch (error) {
        this.$message({
          showClose: true,
          message: '服务器出错',
          type: 'error'
        })
      }
    },
    getReqParams() {
      const username = this.user
      if (username) {
        return {
          user: username
        }
      }
    },
    async fetchData() {
      try {
        const reqParams = this.getReqParams()
        this.tableData = await this.namespaceService.list(reqParams)
      } catch (error) {
        this.$message({
          showClose: true,
          message: '服务器出错',
          type: 'error'
        })
      }
    },
    showEditDialog(row) {
      this.dialogVisible = true
      this.editForm = row || {}
    },
    closeDialog() {
      this.dialogVisible = false
    },
    confirmDelete(key) {
      this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleDelete(key)
      })
    },
    async handleEdit(key, value) {
      try {
        const reqParams = this.getReqParams()
        await this.namespaceService.post(key, value, reqParams)
        this.closeDialog()
        this.fetchData()
      } catch (error) {
        this.$message({
          showClose: true,
          message: '服务器出错',
          type: 'error'
        })
      }
    },
    async handleDelete(key) {
      try {
        const reqParams = this.getReqParams()
        await this.namespaceService.delete(key, reqParams)
        this.fetchData()
      } catch (error) {
        this.$message({
          showClose: true,
          message: '服务器出错',
          type: 'error'
        })
      }
    },
    querySearchNamespace(queryString, cb) {
      const result = this.namespaceList
        .filter(item => item.toLowerCase().includes(queryString.toLowerCase()))
        .map(item => ({
          value: item
        }))
      cb(result)
    },
    handleSelectNamespace(value) {
      if (value) {
        this.namespace = value
        this.namespaceService = new SpairService(value)
        this.fetchData()
      }
    }
  }
}
</script>

<style scoped>
  .admin {
    padding: 15px;
  }
</style>
