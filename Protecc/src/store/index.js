import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import Loading from 'vue-loading-overlay';
import firebase from '../firebase'

const db = firebase.db
const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage
})

Vue.use(Vuex)
Vue.use(Loading);
export default new Vuex.Store({
  plugins: [vuexLocal.plugin],
  state: {
    isLoading: false,
    capture: false
  },
  actions: {
    // update stats when packet is added on client side
    updateStats: (context, packet) => {
      const uid = firebase.auth.currentUser.uid
      db.ref(
        'users/' + uid + '/stats/protocol/' + removeChar(packet
          .protocol)
      ).transaction(increment)
      db.ref(
        'users/' + uid + '/stats/length/' + lengthToPath(packet.length)
      ).transaction(increment)
      db.ref(
        'users/' + uid + '/stats/date/' + packet.createdAt.substring(0,
          10)
      ).transaction(increment)
    },
    // delete packet upon event on client side
    deletePacket: (context, packet) => {
      const uid = firebase.auth.currentUser.uid
      const user = db.ref('users').child(uid)
      user
        .child('packets')
        .child(packet['.key'])
        .remove()
      // update statistics
      const userStats = user.child('stats')
      userStats
        .child('protocol')
        .child(removeChar(packet.protocol))
        .transaction(decrement)
      userStats
        .child('length')
        .child(lengthToPath(packet.length))
        .transaction(decrement)
      userStats
        .child('date')
        .child(packet.createdAt.substring(0, 10))
        .transaction(decrement)
    },
    // submit user's capture packet count in settings to database
    submitNumber: (context, input) => {
      const uid = firebase.auth.currentUser.uid
      db.ref('users/' + uid + '/settings/infinite/count').transaction(
        val => {
          return input > 0 ? input : 1
        })
    },
    // save user's settings
    changeInfinityMode: (context, infinity) => {
      const uid = firebase.auth.currentUser.uid
      db.ref('users/' + uid + '/settings/infinite/active').transaction(
        val => {
          return infinity
        })
    },
    changeRulesMode: (context, rules) => {
      const uid = firebase.auth.currentUser.uid
      db.ref('users/' + uid + '/settings/rules/active').transaction(
        val => {
          return rules
        })
    },
    // activate rule by adding rule to active rules
    // only active rules will be used as capture filter for tshark
    activateRule: (context, rule) => {
      const uid = firebase.auth.currentUser.uid
      const key = rule.key
      if (rule.active == false) {
        db.ref('users/' + uid + '/rules/active')
          .child(key)
          .remove()
      } else {
        db.ref('users/' + uid + '/rules/active/' + key).transaction(val =>
          rule)
      }
      db.ref('users/' + uid + '/rules/saved/' + key + '/active')
        .transaction(
          val => !val
        )
    },
    // delete rule from active rules
    // only active rules will be used as capture filter for tshark
    deleteRule: (context, key) => {
      const uid = firebase.auth.currentUser.uid
      db.ref('users/' + uid + '/rules/saved/' + key).remove()
      db.ref('users/' + uid + '/rules/active/' + key).remove()
    },
    // create rule also upon submit
    // update rule upon edit
    updateRule: (context, obj) => {
      const uid = firebase.auth.currentUser.uid
      const id = obj.id
      const rule = obj.rule
      if (id == null || id.length == 0) {
        if (rule.filter != null) {
          const savedRule = db.ref('users/' + uid + '/rules/saved').push(
            rule)
          db.ref('users/' + uid + '/rules/active/' + savedRule.key).set(
            rule)
        }
      } else {
        db.ref('users/' + uid + '/rules/saved')
          .child(id)
          .set(rule)
        db.ref('users/' + uid + '/rules/active')
          .child(id)
          .set(rule)
      }
    },
    // initialize user's settings for new user
    initializeSettings: context => {
      const uid = firebase.auth.currentUser.uid
      const defaults = {}
      defaults['infinite'] = {}
      defaults['infinite']['active'] = true
      defaults['infinite']['count'] = 1
      defaults['rules'] = {}
      defaults['rules']['active'] = true
      db.ref('users/' + uid + '/settings').set(defaults)
    }
  },
  mutations: {
    showLoadingOverlay: state => {
      state.isLoading = true
    },
    hideLoadingOverlay: state => {
      state.isLoading = false
    },
    toggleCapture: state => {
      state.capture = !state.capture
    }
  },
  getters: {
    // get user ID
    getUID: state => {
      const user = firebase.auth.currentUser
      if (user) return user.uid
      return null
    },
    getLoadingStatus: state => {
      return state.isLoading;
    },
    getCaptureStatus: state => {
      return state.capture;
    }
  }
})

/// /////////////////////////// HELPER /////////////////////////////////////////

// categorize packet's length to each category
function lengthToPath(length) {
  if (length < 100) return '0-100'
  else if (length < 200) return '100-200'
  else if (length < 500) return '200-500'
  else if (length < 1000) return '500-1000'
  else if (length < 1500) return '1000-1500'
  else return '1500-'
}

// remove special characters like '.' which cannot be in url path
function removeChar(protocol) {
  if (protocol.includes('.')) {
    const index = protocol.indexOf('.')
    return protocol.substring(0, index) + '-' + protocol.substring(index + 1)
  } else {
    return protocol
  }
}

function increment(val) {
  val++
  return val == null ? 1 : val
}

function decrement(val) {
  val--
  return val
}

/// /////////////////////////////////////////////////////////////////////////////