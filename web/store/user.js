import { COOKIE, SPAIR_NAMESPACE } from '@/constants'
import SpairService from '@/utils/SpairService'
import SHA256 from 'crypto-js/sha256'
const AdminService = new SpairService(SPAIR_NAMESPACE.admin)

export const state = () => ({
  username: ''
})

export const mutations = {
  login(state, username) {
    state.username = username
  },
  logout(state) {
    state.username = ''
  }
}

export const actions = {
  async login({ commit }, { username, password, $cookie }) {
    const users = await AdminService.get('users')
    const sha256Password = SHA256(password).toString()
    const isCorrectUser = users.some(user => user.username === username && user.password === sha256Password)
    if (isCorrectUser) {
      commit('login', username)
      $cookie.set(COOKIE.USER_NAME, username)
    } else {
      throw new Error('登录失败')
    }
  },
  logout({ commit }, { username, $cookie }) {
    commit('logout')
    $cookie.set(COOKIE.USER_NAME, username)
  }
}
