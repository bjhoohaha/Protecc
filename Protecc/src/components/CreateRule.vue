<template>
  <Form />
</template>
<script>
import firebase from '../firebase'
import Form from './Form'
const db = firebase.db

export default {
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
