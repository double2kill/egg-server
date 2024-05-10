<template>
  <van-uploader
    v-model="fileList"
    accept="*"
    max-count="1"
    :preview-full-image="false"
    :after-read="afterRead"
    :before-read="beforeRead"
    :before-delete="beforeDelete"
    @click-preview="clickPreview"
  />
</template>

<script>
import { EGG_SERVER } from "@/constants";
import { Dialog, Toast } from "vant";

export default {
  props: {
    storageName: {
      default: () => [],
      type: String,
    },
    fileNameList: {
      default: () => [],
      type: Array,
    },
    updateFileNameList: {
      default: () => {},
      type: Function,
    },
  },
  data() {
    return {
      lastFileNameList: [],
      fileList: [],
      limitSize: 10,
      uploadUrl: `${EGG_SERVER}/v0.1/upload`,
    };
  },
  watch: {
    fileNameList(val) {
      if (val[0] !== this.lastFileNameList[0]) {
        const newNameList = val.map((name) => {
          const savedFileName = this.getSavedFileName(this.storageName, name);
          return {
            file: {
              name,
            },
            url: `${EGG_SERVER}/public/${savedFileName}`,
          };
        });
        this.fileList = newNameList;
        this.lastFileNameList = val;
      }
    },
  },
  methods: {
    getSavedFileName(storageName, name) {
      return `${storageName}_${name}`;
    },
    async afterRead(fileItem, detail) {
      const { file } = fileItem;
      fileItem.status = "uploading";
      fileItem.message = "上传中...";
      const param = new FormData(); // 创建form对象
      const savedFileName = this.getSavedFileName(this.storageName, file.name);
      param.append("file", file, savedFileName); // 通过append向form对象添加数据
      try {
        await $fetch(
          `${EGG_SERVER}/v0.1/upload`,
          { method: "POST", body: param },
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        fileItem.status = "success";
        fileItem.message = "上传失败";
        this.handleSuccess(file);
      } catch (error) {
        fileItem.status = "failed";
        fileItem.message = "上传失败";
      }
    },
    clickPreview(fileItem) {
      window.open(fileItem.url);
    },
    beforeDelete(fileItem) {
      return Dialog.confirm({
        title: "删除",
        message: `确定移除 ${fileItem.file.name}？`,
      }).then(() => {
        this.handleRemove();
      });
    },
    beforeRead(fileItem) {
      const isLt10M = fileItem.size / 1024 / 1024 < this.limitSize;
      if (!isLt10M) {
        Toast.fail(`上传文件大小不能超过 ${this.limitSize}MB!`);
      }
      return isLt10M;
    },
    handleSuccess(file) {
      const fileNameList = [file.name];
      this.lastFileNameList = fileNameList;
      this.updateFileNameList(fileNameList);
    },
    handleRemove() {
      const fileNameList = [];
      this.lastFileNameList = fileNameList;
      this.updateFileNameList(fileNameList);
    },
  },
};
</script>

<style scoped>
.upload-btn {
  width: 100%;
  max-width: 400px;
}
</style>
