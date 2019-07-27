import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import firebase from '../firebase'

const db = firebase.db
const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage
})

Vue.use(Vuex)
export default new Vuex.Store({
  plugins: [vuexLocal.plugin],
  state: {},
  actions: {
    // update stats when packet is added on client side
    updateStats: (context, packet) => {
      const uid = firebase.auth.currentUser.uid
      db.ref(
        'users/' + uid + '/stats/protocol/' + removeChar(packet.protocol)
      ).transaction(increment)
      db.ref(
        'users/' + uid + '/stats/length/' + lengthToPath(packet.length)
      ).transaction(increment)
      db.ref(
        'users/' + uid + '/stats/date/' + packet.createdAt.substring(0, 10)
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
    }
  },
  mutations: {},
  getters: {
    getUID: state => {
      const user = firebase.auth.currentUser
      console.log(user)
      if (user) return user.uid
      return null
    }
  }
})

/// /////////////////////////// HELPER /////////////////////////////////////////

// categorize packet's length to each category
function lengthToPath (length) {
  if (length < 100) return '0-100'
  else if (length < 200) return '100-200'
  else if (length < 500) return '200-500'
  else if (length < 1000) return '500-1000'
  else if (length < 1500) return '1000-1500'
  else return '1500-'
}

// remove special characters like '.' which cannot be in url path
function removeChar (protocol) {
  if (protocol.includes('.')) {
    const index = protocol.indexOf('.')
    return protocol.substring(0, index) + '-' + protocol.substring(index + 1)
  } else {
    return protocol
  }
}

function increment (val) {
  val++
  return val == null ? 1 : val
}

function decrement (val) {
  val--
  return val
}

/// /////////////////////////////////////////////////////////////////////////////
