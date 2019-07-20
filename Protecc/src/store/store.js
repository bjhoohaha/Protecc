import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    user: 'default'
  },
  actions: {
    updateUser: (context, user) => {
      // console.log('updateUserID fired')
      context.commit('setUser', user)
    }
  },
  mutations: {
    setUser: (state, user) => {
      // console.log('setUserID fired')
      state.user = user
    }
  },
  getters: {
    getUser: state => {
      return state.user
    }
  }
})
