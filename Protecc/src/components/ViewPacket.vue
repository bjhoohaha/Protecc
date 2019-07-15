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
      // bind as object
      packet: {}
    }
  },
  firebase: {
    // reference to db
    packet: db.ref(
      'packets/' +
        // get current path from URL
        // somehow wasnt able to implement this.$routes.params.id
        window.location.href.substring(
          window.location.href.lastIndexOf('/') + 1
        )
    )
  },
  methods: {
    // go back for back button
    goBack () {
      this.$router.back()
    },
    deletePacket (key) {
      // prompt user to confirm
      if (confirm('Confirm?')) {
        db.ref('packets')
          .child(key)
          .remove()
        // redirect back after packet is deleted
        this.$router.push('/')
      }
    }
  }
}
</script>
