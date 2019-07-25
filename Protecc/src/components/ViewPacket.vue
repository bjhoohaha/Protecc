<template>
  <!-- check whether id exists in the database -->
  <div id="view-packet" v-if="Object.keys(packet) != 0">
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
    <!-- call button goBack on click -->
    <button @click="goBack()" class="btn btn-danger">
      Back
    </button>
    <!-- call button deletePacket on click -->
    <button @click="deletePacket()" class="btn btn-danger">
      Delete
    </button>
  </div>
</template>

<script>
import firebase from '../firebase'
// pointer to firebase databse
const db = firebase.db
export default {
  name: 'view-packet',
  // pass the id from Dashboard.vue as props
  props: ['id'],
  data () {
    return {
      packet: {}
    }
  },
  methods: {
    // go back for back button
    goBack () {
      this.$router.back()
    },
    deletePacket () {
      // prompt user to confirm
      if (confirm('Confirm?')) {
        this.$store.dispatch('deletePacket', this.packet)
        // redirect back after packet is deleted
        this.$router.push('/home')
      }
    }
  },
  created () {
    // bind packet with database using VueFire
    this.$rtdbBind('packet', db.ref('packets/' + this.id))
  }
}
</script>
