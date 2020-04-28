import { COOKIE } from '@/constants'

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
  login({ commit }, { username, $cookie }) {
    commit('login', username)
    $cookie.set(COOKIE.USER_NAME, username)
  },
  logout({ commit }, { username, $cookie }) {
    commit('logout')
    $cookie.set(COOKIE.USER_NAME, username)
  }
}
