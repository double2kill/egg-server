import { COOKIE } from '@/constants'

export const actions = {
  nuxtServerInit({ commit }, { app }) {
    const githubUsername = app.$cookies.get(COOKIE.GITHUB_USER_NAME)
    commit('user/githubLogin', githubUsername)
    const username = app.$cookies.get(COOKIE.USER_NAME)
    commit('user/login', username)
  }
}
