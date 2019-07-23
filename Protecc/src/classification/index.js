import Vue from 'vue'
import { store } from '../store'

// render Statistics and database from client side

// database
function database () {
  // database
  this.db = {}
  // check if packet exists
  this.checkPacket = key => {
    return this.db[key] == null
  }
  // add packet to database
  this.addPacket = packet => {
    if (this.db[packet.key] == null) {
      // if packet is not added, render statistics by classifying packet
      store.dispatch('classify', packet)
      Vue.set(this.db, packet.key, packet)
    }
  }
  // delete packet from database
  this.deletePacket = packet => {
    if (this.db[packet.key] != null) {
      Vue.delete(this.db, packet.key)
    }
  }
  // get database
  this.getDatabase = () => {
    return this.db
  }
  // get packet from database
  this.getPacket = key => {
    return this.db[key]
  }
}

// protocol classification information
function protocolClassificationData () {
  // ['TCP','UDP','ARP','NBNS','TLSv1.3','TLSv1.2','IGMPv3','Others']
  this.arr = [0, 0, 0, 0, 0, 0, 0, 0]
  // classify to its respective category
  this.classify = protocol => {
    switch (protocol) {
      case 'TCP':
        Vue.set(this.arr, 0, this.arr[0] + 1)
        break
      case 'UDP':
        Vue.set(this.arr, 1, this.arr[1] + 1)
        break
      case 'ARP':
        Vue.set(this.arr, 2, this.arr[2] + 1)
        break
      case 'NBNS':
        Vue.set(this.arr, 3, this.arr[3] + 1)
        break
      case 'TLSv1.3':
        Vue.set(this.arr, 4, this.arr[4] + 1)
        break
      case 'TLSv1.2':
        Vue.set(this.arr, 5, this.arr[5] + 1)
        break
      case 'IGMPv3':
        Vue.set(this.arr, 6, this.arr[6] + 1)
        break
      default:
        Vue.set(this.arr, 7, this.arr[7] + 1)
        break
    }
  }
  // update data table when packet is deleted
  this.delete = protocol => {
    switch (protocol) {
      case 'TCP':
        Vue.set(this.arr, 0, this.arr[0] - 1)
        break
      case 'UDP':
        Vue.set(this.arr, 1, this.arr[1] - 1)
        break
      case 'ARP':
        Vue.set(this.arr, 2, this.arr[2] - 1)
        break
      case 'NBNS':
        Vue.set(this.arr, 3, this.arr[3] - 1)
        break
      case 'TLSv1.3':
        Vue.set(this.arr, 4, this.arr[4] - 1)
        break
      case 'TLSv1.2':
        Vue.set(this.arr, 5, this.arr[5] - 1)
        break
      case 'IGMPv3':
        Vue.set(this.arr, 6, this.arr[6] - 1)
        break
      default:
        Vue.set(this.arr, 7, this.arr[7] - 1)
        break
    }
  }
  // data array for chart rendering
  this.toDataArray = this.arr
  // label array for chart rendering
  this.toLabelArray = [
    'TCP',
    'UDP',
    'ARP',
    'NBNS',
    'TLSv1.3',
    'TLSv1.2',
    'IGMPv3',
    'Others'
  ]
}

// packet length frequency data
function lengthFrequencyData () {
  // packet count for each category
  this.arr = [0, 0, 0, 0, 0, 0]
  // sort into respective categories
  this.classify = length => {
    if (length < 100) Vue.set(this.arr, 0, this.arr[0] + 1)
    else if (length < 200) Vue.set(this.arr, 1, this.arr[1] + 1)
    else if (length < 500) Vue.set(this.arr, 2, this.arr[2] + 1)
    else if (length < 1000) Vue.set(this.arr, 3, this.arr[3] + 1)
    else if (length < 1500) Vue.set(this.arr, 4, this.arr[4] + 1)
    else Vue.set(this.arr, 5, this.arr[5] + 1)
  }
  // update date when packet is deleted
  this.delete = length => {
    if (length < 100) Vue.set(this.arr, 0, this.arr[0] - 1)
    else if (length < 200) Vue.set(this.arr, 1, this.arr[1] - 1)
    else if (length < 500) Vue.set(this.arr, 2, this.arr[2] - 1)
    else if (length < 1000) Vue.set(this.arr, 3, this.arr[3] - 1)
    else if (length < 1500) Vue.set(this.arr, 4, this.arr[4] - 1)
    else Vue.set(this.arr, 5, this.arr[5] + 1)
  }
  // data array for chart rendering
  this.toDataArray = () => {
    return this.arr
  }
  // label array for chart rendering
  this.toLabelArray = () => {
    return [
      '0 - 100',
      '100-200',
      '200-500',
      '500-1000',
      '1000 - 1500',
      ' > 1500'
    ]
  }
}

// date frequency information
function dateFrequencyData () {
  // data array
  this.arr = []
  // label array
  this.label = []
  this.classify = timestamp => {
    // parse timestamp to date
    const date = new Date(String(timestamp).substring(0, 10))
    const today = new Date()
    if (this.arr.length == 0) {
      // create label and push to data for each date from first to today
      for (
        let currentDate = date;
        currentDate < today;
        currentDate.setDate(currentDate.getDate() + 1)
      ) {
        this.arr.push(0)
        this.label.push(this.toDateString(currentDate))
      }
    }
    const index =
      this.arr.length -
      Math.ceil(Math.abs(today.getTime() - date.getTime()) / 86400000)
    // add data to data array
    Vue.set(this.arr, index, this.arr[index] + 1)
  }
  // update data and labels beforeCreate
  this.update = () => {
    const today = new Date(this.toDateString(new Date()))
    const lastDateString = this.label[this.label.length - 1]
    // update data array and labels if last date in label is not today
    // this is such that the line chart will have updated information for each day
    for (
      let currentDate = new Date(lastDateString);
      currentDate < today;
      currentDate.setDate(currentDate.getDate() + 1)
    ) {
      this.arr.push(0)
      this.label.push(this.toDateString(currentDate))
    }
  }
  // format date to date string
  this.toDateString = date => {
    const year = date.getFullYear()
    const month =
      date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    return year + '-' + month + '-' + day
  }
  // delete date from data array if packet is deleted
  this.delete = timestamp => {
    const date = new Date(String(timestamp).substring(0, 10))
    const index =
      this.arr.length -
      Math.ceil(Math.abs(new Date().getTime() - date.getTime()) / 86400000)
    Vue.set(this.arr, index, this.arr[index] - 1)
  }
  // data array for chart rendering
  this.toDataArray = this.arr
  // label array for chart rendering
  this.toLabelArray = this.label
}

// Self-Made Date Class
function dateDetails () {
  if (date.length == 19) {
    const year = date.substring(0, 4)
    const month = date.substring(5, 7)
    const day = date.substring(8, 10)
    const date = date.substring(0, 10)
    const hour = date.substring(11, 13)
    const minute = date.substring(14, 16)
    const second = date.substring(17)
    this.year = year
    this.month = month
    this.day = day
    this.date = date
    this.hour = hour
    this.minute = minute
    this.second = second
  }
}

export {
  database,
  protocolClassificationData,
  lengthFrequencyData,
  dateFrequencyData
}
