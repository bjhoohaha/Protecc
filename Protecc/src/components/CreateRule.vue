<template>
<div id="create">
  <Form v-bind:idProp="id" v-bind:nameProp="name" v-bind:hostProp="host"
      v-bind:addrProp="addr" v-bind:protProp="prot">
  </Form>
</div>
</template>
<script>
import firebase from '../firebase'
import Form from './Form.vue'
const db = firebase.db

export default {
  data() {
    // empty values for form input
    return {
      id: '',
      name: '',
      host: '',
      addr: '',
      prot: ''
    }
  },
  components: {
    Form
  }
}
</script>
