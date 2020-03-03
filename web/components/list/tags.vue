<template>
  <div>
    <el-tag
      v-for="tag in tags"
      :key="tag"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
    >
      {{ tag }}
    </el-tag>
    <el-input
      v-if="inputVisible"
      ref="saveTagInput"
      v-model="inputValue"
      class="input-new-tag"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    />
    <el-button v-else class="button-new-tag" size="small" @click="showInput">
      + {{ newTagText }}
    </el-button>
  </div>
</template>
<script>
export default {
  props: {
    tags: {
      default: () => [],
      type: Array
    },
    newTagText: {
      default: () => '添加',
      type: String
    },
    onChange: {
      default: () => {},
      type: Function
    }
  },
  data() {
    return {
      inputVisible: false,
      inputValue: ''
    }
  },
  methods: {
    handleClose(closedTag) {
      const tags = this.tags.filter(tag => tag !== closedTag)
      this.onChange(tags)
    },

    showInput() {
      this.inputVisible = true
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm() {
      const inputValue = this.inputValue
      if (inputValue) {
        const tags = this.tags.concat(inputValue)
        this.onChange(tags)
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  }
}
</script>

<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    vertical-align: bottom;
  }
  .el-tag + .input-new-tag,
  .el-tag + .button-new-tag {
    margin-left: 10px;
  }
</style>
