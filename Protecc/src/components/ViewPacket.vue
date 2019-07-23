<template>
  <!-- check whether id exists in the database -->
  <div id="view-packet" v-if="!isEmpty">
    <ul class="collection with-header">
      <li class="collection-header">Packet Name : {{ getPacket.key }}</li>
      <li class="collection-item">JSON : {{ getPacket }}</li>
      <li class="collection-item">Created At : {{ getPacket.createdAt }}</li>
      <li class="collection-item">Packet Source : {{ getPacket.sourceIp }}</li>
      <li class="collection-item">
        Packet Destination : {{ getPacket.destinationIp }}
      </li>
      <li class="collection-item">
        Packet Protocol : {{ getPacket.protocol }}
      </li>
      <li class="collection-item">Packet length : {{ getPacket.length }}</li>
      <li class="collection-item">Packet info : {{ getPacket.info }}</li>
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
import { FirebaseInit } from '../store'
// pointer to firebase databse
const db = FirebaseInit.db
export default {
  name: 'view-packet',
  // pass the id from Dashboard.vue as props
  props: ['id'],
  data () {
    return {}
  },
  methods: {
    // go back for back button
    goBack () {
      this.$router.back()
    },
    deletePacket () {
      // prompt user to confirm
      if (confirm('Confirm?')) {
        db.ref('packets')
          .child(this.packet.key)
          .remove()
        // update Vuex when packet is deleted
        this.$store.commit('deletePacket', this.packet)
        // redirect back after packet is deleted
        this.$router.push('/home')
      }
    }
  },
  computed: {
    isEmpty: function () {
      return this.$store.getters.isEmpty(this.id)
    },
    getPacket: function () {
      return this.$store.getters.getPacket(this.id)
    }
  }
}
</script>
