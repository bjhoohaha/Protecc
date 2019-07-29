// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import firebase from './firebase'
import './plugins/vuetify'
import { rtdbPlugin } from 'vuefire'
import App from './App.vue'
import Vuetify from 'vuetify'
import router from './router'
import store from './store'

Vue.use(rtdbPlugin)
Vue.use(Vuetify)
Vue.config.productionTip = false

let app = null
const auth = firebase.auth

// vue routes to next page view takes place
// before firebase initialization takes place
// reinitialize app with firebase auth upon change
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
