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
    return decodeURIComponent(res.data)
  }
  post(key, value) {
    const encodedKey = encodeURIComponent(key)
    const encodedValue = encodeURIComponent(encodeURIComponent(value))
    return axios.get(`${SPAIR}/${this.namespace}/${encodedKey}/${encodedValue}`)
  }
}
