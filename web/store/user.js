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
  setUsername({ commit }, { username, $cookies }) {
    commit('login', username)
    $cookies.set(COOKIE.USER_NAME, username)
  },
  async login({ dispatch }, { username, password, $cookies }) {
    const userInfo = await UserService.get(username)
    const sha256Password = SHA256(password).toString()
    const isCorrectUser = userInfo.password === sha256Password
    if (isCorrectUser) {
      dispatch('setUsername', {
        username,
        $cookies
      })
    } else {
      throw new Error('登录失败')
    }
  },
  async signup({ dispatch }, { username, password, $cookies }) {
    const user = await UserService.get(username)
    if (user) {
      throw new Error('用户已存在')
    }
    const sha256Password = SHA256(password).toString()
    await UserService.post(username, {
      password: sha256Password
    })
    dispatch('setUsername', {
      username,
      $cookies
    })
  },
  logout({ commit }, { username, $cookies }) {
    commit('logout')
    $cookies.set(COOKIE.USER_NAME, username)
  }
}
