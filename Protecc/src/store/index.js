import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import firebase from '../firebase'

const db = firebase.db
const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage
})

/// /////////////////////////////////////////////////////////////////////////////

function lengthToPath (length) {
  if (length < 100) return '0-100'
  else if (length < 200) return '100-200'
  else if (length < 500) return '200-500'
  else if (length < 1000) return '500-1000'
  else if (length < 1500) return '1000-1500'
  else return '1500-'
}

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
  return val
}

function decrement (val) {
  val--
  return val
}

/// /////////////////////////////////////////////////////////////////////////////

Vue.use(Vuex)
export default new Vuex.Store({
  plugins: [vuexLocal.plugin],
  state: {},
  actions: {
    // update components before render
    update: context => {},
    // update stats when packet is added on client side
    updateStats: (context, packet) => {
      db.ref('stats/protocol/' + removeChar(packet.protocol)).transaction(
        increment
      )
      db.ref('stats/length/' + lengthToPath(packet.length)).transaction(
        increment
      )
      db.ref('stats/date/' + packet.createdAt.substring(0, 10)).transaction(
        increment
      )
    },
    // delete packet upon event on client side
    deletePacket: (context, packet) => {
      db.ref('packets/' + packet['.key']).remove()
      // update statistics
      db.ref('stats/protocol/' + removeChar(packet.protocol)).transaction(
        decrement
      )
      db.ref('stats/length/' + lengthToPath(packet.length)).transaction(
        decrement
      )
      db.ref('stats/date/' + packet.createdAt.substring(0, 10)).transaction(
        decrement
      )
    }
  },
  mutations: {},
  getters: {}
})
