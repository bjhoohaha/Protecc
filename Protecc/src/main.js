// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { FirebaseInit } from './store'
import './plugins/vuetify'
import { rtdbPlugin } from 'vuefire'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import router from './router'
import Vuex from 'vuex'
// store is property in './store/index.js'
import { store } from './store'

Vue.use(rtdbPlugin)
Vue.use(VueRouter)
Vue.use(Vuetify)
Vue.use(Vuex)
Vue.config.productionTip = false

let app = ''
const auth = FirebaseInit.auth
auth.onAuthStateChanged(function () {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      components: { App },
      template: '<App/>'
    }).$mount('#app')
  }
})
