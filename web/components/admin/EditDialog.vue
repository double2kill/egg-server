<template>
  <el-dialog
    title="编辑"
    :visible="visible"
    width="70%"
    :before-close="closeDialog"
  >
    <el-form :model="form">
      <el-form-item label="key" :label-width="formLabelWidth">
        {{ form.key }}
      </el-form-item>
      <el-form-item label="value" :label-width="formLabelWidth">
        <el-input
          v-model="form.value"
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          :autosize="{ minRows: 1, maxRows: 10}"
        />
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="closeDialog">
        取 消
      </el-button>
      <el-button type="primary" @click="clickEdit">
        修 改
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      default: () => false,
      type: Boolean
    },
    editForm: {
      default: () => { return {} },
      type: Object
    },
    closeDialog: {
      default: () => {},
      type: Function
    },
    handleEdit: {
      default: () => {},
      type: Function
    }
  },
  data() {
    return {
      form: {},
      formLabelWidth: '90px'
    }
  },
  watch: {
    editForm(formData) {
      if (typeof formData.value === 'string') {
        this.form = {
          ...formData
        }
      } else {
        this.form = {
          ...formData,
          value: JSON.stringify(formData.value, null, 2)
        }
      }
    }
  },
  methods: {
    clickEdit() {
      const { key } = this.form
      let { value } = this.form
      try {
        value = JSON.parse(value)
      } catch (e) {}
      this.handleEdit(key, value)
    }
  }
}
</script>
