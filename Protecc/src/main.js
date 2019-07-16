// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import './plugins/vuetify'
import { rtdbPlugin } from 'vuefire'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import router from './router'

Vue.use(rtdbPlugin)
Vue.use(VueRouter)
Vue.use(Vuetify)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
}).$mount('#app')
