<template>
  <div>
    <van-cell-group>
      <van-field ref="storageName" v-model="storageName" placeholder="请输入你喜欢的名称" />
      <van-field>
        <div slot="input" style="width: 100%">
          <div class="button-box">
            <van-button size="small" @click="handleClear">
              清空
            </van-button>
            <van-button type="primary" plain size="small" @click="handleCopy">
              复制
            </van-button>
          </div>
          <Editor
            v-model="text"
            :api-key="apiKey"
            :images_upload_handler="uploadImage"
            :init="editorInit"
          />
        </div>
      </van-field>
      <van-field>
        <div slot="input" class="upload-box">
          <div>
            <Upload
              :storage-name="storageName"
              :file-name-list="fileNameList"
              :update-file-name-list="updateFileNameList"
            />
          </div>
          <p class="description">
            文件大小限制10M
          </p>
        </div>
      </van-field>
    </van-cell-group>
    <div class="submit-group">
      <van-button type="primary" @click="submitText">
        提交
      </van-button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import Editor from '@tinymce/tinymce-vue'
import { textStorageService } from './service'
import { TEXT_STORAGE_STORAGE_NAME, defaultStorageName } from './data'
import Upload from './common/upload'
import axios from 'axios'
import { EGG_SERVER } from '@/constants'

export default {
  name: 'Storage',
  components: {
    Upload,
    Editor
  },
  props: {
    storageNameFromList: {
      default: () => '',
      type: String
    }
  },
  data() {
    return {
      apiKey: '27pm3mknbtxqaw8n3aq9g9vh7f4oyz1p75zeundv79mjmyty',
      fileNameList: [],
      storageName: defaultStorageName,
      text: '',
      editorInit: {
        menubar: false,
        language: 'zh_CN',
        plugins: [
          'lists advlist',
          'autolink link',
          'image imagetools',
          'code codesample',
          'fullscreen',
          'table save paste searchreplace autoresize wordcount quickbars help '
        ],
        toolbar: `code | undo redo | formatselect | bold italic backcolor |
           alignleft aligncenter alignright alignjustify |
           bullist numlist outdent indent |  | image codesample | fullscreen  |  help`,
        paste_data_images: true,
        codesample_languages: [
          { text: 'JavaScript', value: 'javascript' },
          { text: 'HTML/XML', value: 'markup' },
          { text: 'CSS', value: 'css' }
        ],
        images_upload_handler: this.uploadImage,
        save_onsavecallback: this.submitText,
        mobile: {
          plugins: 'image fullscreen autoresize',
          toolbar: 'image fullscreen'
        }
      }
    }
  },
  watch: {
    storageNameFromList(val) {
      if (val === 'add') {
        this.storageName = ''
        this.text = ''
        this.fileNameList = []
        this.$refs.storageName.focus()
        return
      }
      this.storageName = val
      this.getText()
    }
  },
  async mounted() {
    const list = await textStorageService.list()
    this.storageName = list.length > 0 ? list[0].key : defaultStorageName
    this.getText()
  },
  methods: {
    getStorageName() {
      return this.storageName || defaultStorageName
    },
    async getText() {
      const storageName = this.getStorageName()
      try {
        const res = await textStorageService.get(storageName)
        let resData
        try {
          resData = JSON.parse(res)
        } catch (error) {
          resData = res
        }
        if (typeof resData === 'object') {
          this.text = resData.text
          this.fileNameList = resData.fileNameList
        } else {
          this.text = res
          this.fileNameList = []
        }
      } catch (error) {
        Toast.fail('服务器出错')
        throw new Error('服务器出错')
      }
    },
    async submitText() {
      try {
        const storageName = this.getStorageName()
        let data = this.text
        if (this.fileNameList.length > 0) {
          data = JSON.stringify({
            text: this.text,
            fileNameList: this.fileNameList
          })
        }
        await textStorageService.post(storageName, data)
        Toast.success('保存成功')
        localStorage.setItem(TEXT_STORAGE_STORAGE_NAME, this.storageName)
      } catch (error) {
        Toast.fail('保存失败')
      }
    },
    handleCopy() {
      const tempInput = document.createElement('input')
      tempInput.setAttribute('value', this.text)
      document.body.appendChild(tempInput)
      tempInput.select()
      document.execCommand('copy')
      document.body.removeChild(tempInput)
      Toast.success('复制成功')
    },
    handleClear() {
      this.text = ''
      this.$refs.storageText.focus()
    },
    updateFileNameList(fileNameList) {
      this.fileNameList = fileNameList
    },
    async uploadImage(blobInfo, success, failure) {
      const data = new FormData()
      const fileInfo = blobInfo.blob()
      const fileName = fileInfo.name || `image_${new Date().valueOf()}.png`
      data.append('file', fileInfo, fileName)
      data.append('allowSize', 10)
      await axios.post(`${EGG_SERVER}/v0.1/upload`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      success(`${EGG_SERVER}/public/${fileName}`)
    }
  }
}

</script>

<style>
  .van-cell {
    align-items: center;
  }
  .submit-group {
    padding: 16px;
    text-align: right;
  }
  .button-box {
    margin-bottom: 10px;
  }
  .button-box button+button {
    margin-top: 10px;
  }
  .upload-box {
    padding-top: 10px;
  }
  .description {
    color: rgba(69, 90, 100, 0.6)
  }
</style>
