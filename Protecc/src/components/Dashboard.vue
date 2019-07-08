<template>
  <div id="dashboard">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>My Current flagged packets</h4>
      </li>

      <li v-for="packet in packets" class="collection-item" >
        <div class = "chip"> {{ packet.sourceIp }} </div> >
        <div class = "chip"> {{ packet.destinationIp }} </div> </br>
           {{ packet.createdAt }} </br>
           Packet Protocol : {{ packet.protocol }} </br>
           Length: {{ packet.length }} </br>
           Info: {{ packet.info }} </br>

        <!-- <router-link class="secondary-content"
   v-bind:to="{ name: 'view-packet',
   params: {number: packet.number }}">
   <i class="fa fa-eye">
       </i>
       </router-link> -->
      </li>
    </ul>

    <div class="fixed-action-btn">
      <router-link
        to="/new"
        class="btn-floating
btn-large green"
      >
        New
        <i class="fa fa-arrow"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import { db } from './firebaseInit'
//pointer to firebase databse
const ref = db.ref("packets");
let packetArray = [];
//load values once
ref.once("value")
   .then(function(snapshot) {
    //if reference to table 'packets' exists push to array
    if(snapshot.exists()) {
        snapshot.forEach(function (childSnapshot) {
            const obj = childSnapshot.val()
            obj.id = childSnapshot.key
            packetArray.push(obj);
        })
    }
  });
 //new packet will be at the last 1 of the database
 //push new packet to array
ref.limitToLast(1).on("child_added", function(snapshot) {
  if(snapshot.exists()) {
      console.log("changed")
      const obj = snapshot.val()
      obj.id = snapshot.key
      packetArray.push(obj);
  }
});
//export componenet dashboard
export default {
  name: 'dashboard',
  data() {
    return {
      packets : packetArray
    }
  },
  firebase: {
    packets: db.ref('packets')
  }
}
// export const dashboardComponent = {
//   firebase: {
//     packetDb: db
//   }
// }
// export default {
//     name: 'dashboard',
//     data () {
//         return {
//            packets: []
//
//         }
//     },
//     created () {
// db.collection('packets').get().then
// (querySnapshot => {
//     querySnapshot.forEach(doc => {
//        const data = {
//             'id' : doc.id,
//             'number': doc.data().number,
//             'time':doc.data().time,
//             'source': doc.data().source,
//             'protocol': doc.data().protocol,
//             'destination' : doc.data().destination,
//             'info' : doc.data().info,
//             'length' : doc.data().length
//
//
//     }
//     this.packets.push(data)
//     })
// })
// }
// }
</script>
