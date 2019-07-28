<template>
  <Form
    v-bind:idProp="id"
    v-bind:nameProp="name"
    v-bind:hostProp="host"
    v-bind:addrProp="addr"
    v-bind:protProp="prot"
  />
</template>
<script>
import Form from './Form.vue'
import firebase from '../firebase'

const db = firebase.db

export default {
  props: ['id', 'name', 'host', 'addr', 'prot', 'submit'],
  data () {
    return {
      hostSelect: ['Source', 'Destination', 'All'],
      protocolSelect: ['TCP', 'UDP', 'ARP', 'RARP', 'IP', 'IP6']
    }
  },
  components: {
    Form
  }
}
</script>
<style scoped>
.v-btn {
  font-family: 'Patua One';
  color: white;
}
</style>
