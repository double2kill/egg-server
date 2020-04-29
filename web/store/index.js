import { COOKIE } from '@/constants'

export const actions = {
  nuxtServerInit({ commit }, { app }) {
    const username = app.$cookies.get(COOKIE.USER_NAME)
    commit('user/login', username)
  }
}
