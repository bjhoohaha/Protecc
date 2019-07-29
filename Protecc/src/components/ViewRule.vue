<template>
  <!-- pass data to form as props -->
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
    return {}
  },
  components: {
    Form
  }
}
</script>
