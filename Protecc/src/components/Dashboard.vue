<template>
<div id="dashboard">
  <ul class="collection with-header">
    <li class="collection-header">
      <h4>My Current flagged packets</h4>
    </li>
    <!--  Display each packet in list -->
    <li v-bind:key="key" v-for="(packet, key) in packets"
        class="collection-item">
      <!-- Eye button to next packet  -->
      <router-link class="secondary-content" v-bind:to="{
            name: 'view-packet',
            params: {
              // pass in ID of packet as prop to ViewPacket
              id: key
            }
          }">
        <i class="fa fa-eye fa-lg"> </i>
      </router-link>
      <div class="chip">
        {{ packet.sourceIp }}
      </div>
      <div class="chip">
        {{ packet.destinationIp }}
      </div>
      <br />
      {{ packet.createdAt }}
      <br />
      Packet Protocol : {{ packet.protocol }}
      <br />
      Length: {{ packet.length }}
      <br />
      Info: {{ packet.info }}
      <br />
    </li>
  </ul>
</div>
</template>

<script>
import firebase from '../firebase'

const db = firebase.db
const auth = firebase.auth
const ref = db.ref('packets').orderByChild('createdAt')

export default {
  name: 'dashboard',
  data() {
    return {
      packets: {}
    }
  },
  created() {
    // bind packet with database using VueFire
    const uid = this.$store.getters.getUID
    if (uid != null) {
      this.$rtdbBind('packets', db.ref('users/' + uid + '/packets'))
    }
  }
}
</script>
