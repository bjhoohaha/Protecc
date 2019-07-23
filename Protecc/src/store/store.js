import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import {
  database,
  protocolClassificationData,
  lengthFrequencyData,
  dateFrequencyData
} from '../classification'

const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage
})

Vue.use(Vuex)
export default new Vuex.Store({
  plugins: [vuexLocal.plugin],
  state: {
    database: new database(),
    protocolClassificationData: new protocolClassificationData(),
    lengthFrequencyData: new lengthFrequencyData(),
    dateFrequencyData: new dateFrequencyData()
  },
  actions: {
    // update components before render
    update: context => {
      context.commit('updateDate')
    },
    // add packet to each OOP class for chart rendering in PacketStats.vue
    classify: (context, packet) => {
      if (packet.protocol != null) {
        context.commit('classifyProtocol', packet.protocol)
      }
      if (packet.length != null) {
        context.commit('classifyLength', packet.length)
      }
      if (packet.createdAt != null) {
        context.commit('classifyDate', packet.createdAt)
      }
    }
  },
  mutations: {
    // add packet to database
    addPacket: (state, val) => {
      state.database.addPacket(val)
    },
    // delete packet to database
    deletePacket: (state, val) => {
      state.database.deletePacket(val)
      state.protocolClassificationData.delete(val.protocol)
      state.lengthFrequencyData.delete(val.length)
      state.dateFrequencyData.delete(val.createdAt)
    },
    // classify packet protocol to its protocol for Statistics
    classifyProtocol: (state, val) => {
      state.protocolClassificationData.classify(val)
    },
    // classify packet length to its length for Statistics
    classifyLength: (state, val) => {
      state.lengthFrequencyData.classify(val)
    },
    // lassify packet createdAt to its date for Statistics
    classifyDate: (state, val) => {
      state.dateFrequencyData.classify(val)
    },
    // update dates to include today
    updateDate: (state, val) => {
      state.dateFrequencyData.update()
    }
  },
  getters: {
    // get Database for Dashboard.vue
    getDatabase: state => {
      return state.database.getDatabase()
    },
    // check whether packet exists for ViewPacket.vue
    isEmpty: state => {
      return key => {
        return state.database.checkPacket(key)
      }
    },
    // get packet info for ViewPacket.vue
    getPacket: state => {
      return key => {
        return state.database.getPacket(key)
      }
    },
    // doughnut chart label array
    getProtocolLabel: state => {
      return state.protocolClassificationData.toLabelArray
    },
    // doughnut chart data array
    getProtocolData: state => {
      return state.protocolClassificationData.toDataArray
    },
    // bar chart label array
    getLengthLabel: state => {
      return state.lengthFrequencyData.toLabelArray()
    },
    // bar chart label array
    getLengthData: state => {
      return state.lengthFrequencyData.toDataArray()
    },
    // line chart label array
    getDateLabel: state => {
      return state.dateFrequencyData.toLabelArray
    },
    // line chart data array
    getDateData: state => {
      return state.dateFrequencyData.toDataArray
    }
  }
})
