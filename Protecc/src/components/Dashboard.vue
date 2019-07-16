<template>
  <div id="dashboard">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>My Current flagged packets</h4>
      </li>
      <li v-for="packet in packets" class="collection-item" >
        <router-link class="secondary-content"
                     v-bind:to="{ name: 'view-packet',
                                  params: {id: packet['.key'], packet: packet}}">
          <i class="fa fa-eye fa-lg"></i>
        </router-link>
        <div class = "chip"> {{ packet.sourceIp }} </div> >
        <div class = "chip"> {{ packet.destinationIp }} </div> </br>
           {{ packet.createdAt }} </br>
           Packet Protocol : {{ packet.protocol }} </br>
           Length: {{ packet.length }} </br>
           Info: {{ packet.info }} </br>
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
import { FirebaseInit } from '../store'
//pointer to firebase databse
const db = FirebaseInit.db
//export componenet dashboard
export default {
  name: 'dashboard',
  data() {
    return {
      //packets will refer to this.$firebase.packets
      //binded using VueFire
      packets : []
    }
  },
  firebase: {
    //bind using VueFire
    packets: db.ref('packets')
  }
}
</script>
