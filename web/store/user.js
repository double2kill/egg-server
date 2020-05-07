import { COOKIE, SPAIR_NAMESPACE } from '@/constants'
import SpairService from '@/utils/SpairService'
import SHA256 from 'crypto-js/sha256'
const UserService = new SpairService(SPAIR_NAMESPACE.user)

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
    const userInfo = await UserService.get(username)
    const sha256Password = SHA256(password).toString()
    const isCorrectUser = userInfo.password === sha256Password
    if (isCorrectUser) {
      commit('login', username)
      $cookie.set(COOKIE.USER_NAME, username)
    } else {
      throw new Error('登录失败')
    }
  },
  async signup({ commit }, { username, password, $cookie }) {
    const user = await UserService.get(username)
    if (user) {
      throw new Error('用户已存在')
    }
    const sha256Password = SHA256(password).toString()
    await UserService.post(username, {
      password: sha256Password
    })
    commit('login', username)
    $cookie.set(COOKIE.USER_NAME, username)
  },
  logout({ commit }, { username, $cookie }) {
    commit('logout')
    $cookie.set(COOKIE.USER_NAME, username)
  }
}
