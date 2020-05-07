import axios from 'axios'
import URL from '~/constants'
const SPAIR = URL.SPAIR

export default class SpairService {
  constructor(namespace) {
    this.namespace = namespace
  }
  async list(params) {
    const res = await axios.get(`${SPAIR}/${this.namespace}`, { params })
    return res.data || []
  }
  async get(key, params) {
    const encodedKey = encodeURIComponent(key)
    const res = await axios.get(`${SPAIR}/${this.namespace}/${encodedKey}`, { params }) || ''
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
  post(key, value, params) {
    const encodedKey = encodeURIComponent(key)
    return axios.post(`${SPAIR}/${this.namespace}/${encodedKey}`, {
      value
    }, {
      params
    })
  }
  delete(key, params) {
    const encodedKey = encodeURIComponent(key)
    return axios.delete(`${SPAIR}/${this.namespace}/${encodedKey}`, { params })
  }
}
