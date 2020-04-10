import axios from 'axios'
import URL from '~/constants'
const SPAIR = URL.SPAIR

export default class SpairService {
  constructor(namespace) {
    this.namespace = namespace
  }
  async list() {
    const res = await axios.get(`${SPAIR}/${this.namespace}`)
    return res.data || []
  }
  async get(key) {
    const encodedKey = encodeURIComponent(key)
    const res = await axios.get(`${SPAIR}/${this.namespace}/${encodedKey}`) || ''
    const { data } = res
    if (typeof data !== 'string') {
      return data
    }
    try {
      // 兼容旧数据
      return decodeURIComponent(data)
    } catch (e) {
      return data
    }
  }
  post(key, value) {
    const encodedKey = encodeURIComponent(key)
    return axios.post(`${SPAIR}/${this.namespace}/${encodedKey}`, {
      value
    })
  }
}
