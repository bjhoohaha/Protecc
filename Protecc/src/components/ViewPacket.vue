<template>
  <div id="view-packet">
    <ul class="collection with-header">
      <li class="collection-header">Packet Name : {{ id }}</li>
      <li class="collection-item">JSON : {{ packet }}</li>
      <li class="collection-item">Created At : {{ packet.createdAt }}</li>
      <li class="collection-item">Packet Source : {{ packet.sourceIp }}</li>
      <li class="collection-item">
        Packet Destination : {{ packet.destinationIp }}
      </li>
      <li class="collection-item">Packet Protocol : {{ packet.protocol }}</li>
      <li class="collection-item">Packet length : {{ packet.length }}</li>
      <li class="collection-item">Packet info : {{ packet.info }}</li>
    </ul>
    <!-- <router-link to="/" -->
    <button @click="goBack()" class="btn btn-danger">
      Back
    </button>
    <button @click="deletePacket(packet['.key'])" class="btn btn-danger">
      Delete
    </button>
    <!-- </router-link> -->
  </div>
</template>

<script>
import { FirebaseInit } from '../store'
// pointer to firebase databse
const db = FirebaseInit.db
export default {
  name: 'view-packet',
  props: ['id'],
  data () {
    return {
      packet: {}
      // bind as object
      // packet: this.packet
    }
  },
  firebase: {
    packet: db.ref(
      'packets/' +
        // this.id +
        window.location.href.substring(
          window.location.href.lastIndexOf('/') + 1
        )
    )
  },
  methods: {
    goBack () {
      this.$router.back()
    },
    deletePacket (key) {
      if (confirm('Confirm?')) {
        db.ref('packets')
          .child(key)
          .remove()
        this.$router.push('/')
      }
    }
  }
}
</script>
