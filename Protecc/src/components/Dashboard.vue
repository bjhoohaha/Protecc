<template>
  <div id="dashboard">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>My Current flagged packets</h4>
      </li>
      <li
        v-bind:key="packet.key"
        v-for="packet in getDatabase"
        class="collection-item"
      >
        <router-link
          class="secondary-content"
          v-bind:to="{
            name: 'view-packet',
            params: {
              id: packet.key
            }
          }"
        >
          <i class="fa fa-eye fa-lg"> </i>
        </router-link>
        <div class="chip">{{ packet.sourceIp }}</div>
        >
        <div class="chip">{{ packet.destinationIp }}</div>
        <br />
        {{ packet.createdAt }} <br />
        Packet Protocol : {{ packet.protocol }} <br />
        Length: {{ packet.length }} <br />
        Info: {{ packet.info }} <br />
      </li>
    </ul>

    <div class="fixed-action-btn">
      <router-link to="/new" class="btn-floating btn-large green">
        New
        <i class="fa fa-arrow"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { FirebaseInit, store } from '../store'
// pointer to firebase databse
const db = FirebaseInit.db
const ref = db.ref('packets').orderByChild('createdAt')

// export componenet dashboard
export default {
  name: 'dashboard',
  data () {
    return {
      packets: this.$store.getters.getDatabase
    }
  },
  computed: {
    getDatabase () {
      // retrieve database
      return this.$store.getters.getDatabase
    }
  }
}
</script>
