<!-- <template>
  <div id="view-packet">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>Packet Number : {{ number }}</h4>
      </li>
      <li class="collection-item">Time (After 1st packet) :{{ time }}</li>
      <li class="collection-item">Packet Source : {{ source }}</li>
      <li class="collection-item">Packet Protocol : {{ protocol }}</li>
      <li class="collection-item">Packet Destination : {{ destination }}</li>
      <li class="collection-item">Packet length : {{ length }}</li>
      <li class="collection-item">Packet info : {{ info }}</li>
    </ul>
    <button @click="deletePacket" class="btn red">
      Delete this Packet!!! (safe)
    </button>
  </div>
</template>

<script>
import db from './firebaseInit'
var starCountRef = db.ref('packets')
starCountRef.on('value', function(snapshot) {
  console.log(snapshot)
})
</script> -->
