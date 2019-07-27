// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import firebase from './firebase'
import './plugins/vuetify'
import { rtdbPlugin } from 'vuefire'
import App from './App.vue'
import Vuetify from 'vuetify'
import router from './router'
// store is property in './store/index.js'
import store from './store'

Vue.use(rtdbPlugin)
Vue.use(Vuetify)
Vue.config.productionTip = false

let app = null
const auth = firebase.auth

// router beforeEach takes place before firebase initialization takes place
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
