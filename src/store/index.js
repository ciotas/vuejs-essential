import Vue from 'vue'
import Vuex from 'vuex'
import ls from '../utils/localStorage'
import router from '../router'
import * as moreActions from './actions'

Vue.use(Vuex)

const state = {
  user: ls.getItem('user'),
  auth: ls.getItem('auth'),
  articles: ls.getItem('articles')
}

const mutations = {
  UPDATE_USER (state, user) {
    state.user = user
    ls.setItem('user', user)
  },
  UPDATE_AUTH (state, auth) {
    state.auth = auth
    ls.setItem('auth', auth)
  },
  UPDATE_ARTICLES (state, articles) {
    state.articles = articles
    ls.setItem('articles', articles)
  }
}

const actions = {
  login ({ commit }, user) {
    if (user) commit('UPDATE_USER', user)
    // 更新当前用户的登录状态为已登录
    commit('UPDATE_AUTH', true)
    router.push('/')
  },
  logout ({ commit }) {
    commit('UPDATE_AUTH', false)
    router.push({ name: 'Home', params: { logout: true } })
  },
  updateUser ({state, commit}, user) {
    const stateUser = state.user
    if (stateUser && typeof stateUser === 'object') {
      user = { ...stateUser, ...user }
    }
    commit('UPDATE_USER', user)
  },
  ...moreActions
}

const getters = {
  getArticleById: (state) => (id) => {
    let articles = state.articles
    // 所有文章是一个数组时
    if (Array.isArray(articles)) {
      // 传进来的 id 和文章的 articleId 相同时，返回这些文章
      articles = articles.filter(article => parseInt(id) === parseInt(article.articleId))
      // 根据文章长度，返回文章或者 null
      return articles.length ? articles[0] : null
    } else {
      return null
    }
  }
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store
