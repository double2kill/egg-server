<template>
  <div>
    <van-cell-group>
      <van-field ref="storageName" v-model="storageName" placeholder="请输入你喜欢的名称" label="名称">
        <van-button slot="button" size="small" @click="handleChangeStorageName">
          切换
        </van-button>
      </van-field>
      <van-field label="文字">
        <ckeditor
          ref="storageText"
          slot="input"
          v-model="text"
          :editor="editor"
          :config="editorConfig"
        />
        <div slot="button" class="button-box">
          <van-button size="small" @click="handleClear">
            清空
          </van-button>
          <van-button type="primary" plain size="small" @click="handleCopy">
            复制
          </van-button>
        </div>
      </van-field>
      <van-field
        label="文件"
      >
        <div slot="input" class="upload-box">
          <div>
            <Upload
              :storage-name="storageName"
              :file-name-list="fileNameList"
              :update-file-name-list="updateFileNameList"
            />
          </div>
          <p class="description">
            大小限制10M
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
import { textStorageService, textStorageListService } from './service'
import { TEXT_STORAGE_STORAGE_NAME, defaultStorageName } from './data'
import Upload from './common/upload'
import MyCustomUploadAdapterPlugin from './common/ckeditor/MyCustomUploadAdapterPlugin'

let ClassicEditor
if (process.browser) {
  ClassicEditor = require('@ckeditor/ckeditor5-build-classic')
  // eslint-disable-next-line no-console
  console.log(ClassicEditor.builtinPlugins.map(plugin => plugin.pluginName))
}

export default {
  name: 'Storage',
  components: {
    Upload
  },
  props: {
    storageNameFromList: {
      default: () => '',
      type: String
    }
  },
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {
        toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'blockQuote', 'imageUpload' ],
        image: {
          toolbar: [ 'imageTextAlternative', '|', 'imageStyle:alignLeft', 'imageStyle:full', 'imageStyle:alignRight' ],
          styles: [
            'full',
            'alignLeft',
            'alignRight'
          ]
        },
        extraPlugins: [ MyCustomUploadAdapterPlugin ]
      },
      fileNameList: [],
      storageName: defaultStorageName,
      text: ''
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
    const list = await textStorageListService.get()
    this.storageName = list.length > 0 ? list[0].name : defaultStorageName
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
        this.updateStorageList(storageName)
      } catch (error) {
        Toast.fail('保存失败')
      }
    },
    async updateStorageList(storageName) {
      const storageData = {
        name: storageName,
        updateTime: new Date().valueOf()
      }
      await textStorageListService.post(storageData)
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
    async handleChangeStorageName() {
      await this.getText()
    },
    updateFileNameList(fileNameList) {
      this.fileNameList = fileNameList
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
    display: flex;
    flex-direction: column;
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
