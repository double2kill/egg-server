import axios from 'axios'
import { EGG_SERVER } from '@/constants'

export class UploadAdapter {
  constructor(loader) {
    this.loader = loader
  }
  async upload() {
    const data = new FormData()
    const fileInfo = await this.loader.file
    const fileName = fileInfo.name === 'image.png' ? `image_${new Date().valueOf()}.png` : fileInfo.name
    data.append('file', fileInfo, fileName)
    data.append('allowSize', 10)// 允许图片上传的大小/兆
    await axios.post(`${EGG_SERVER}/v0.1/upload`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return {
      default: `${EGG_SERVER}/public/${fileName}`
    }
  }
  abort() {
  }
}

export default function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    // Configure the URL to the upload script in your back-end here!
    return new UploadAdapter(loader, '/common/img/upload')
  }
}
