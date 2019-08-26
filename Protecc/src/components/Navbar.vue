<template>
<div id="navbar">
  <v-tabs background color="pink lighten-1" dark>
    <v-tab to="/home"> Home </v-tab>
    <v-tab to="/rules"> Rules </v-tab>
    <v-tab to="/stats"> Stats </v-tab>
    <v-spacer></v-spacer>
    <v-tab to="/settings"> Settings </v-tab>
    <v-tab @click="signOut"> Sign Out </v-tab>
  </v-tabs>
</div>
</template>
<style scoped>
.v-tabs__div {
  font-size: 16px;
  font-family: 'Patua One';
}
</style>
<script>
import firebase from '../firebase'
const auth = firebase.auth
export default {
  name: 'navbar',
  data() {
    return {
      overlay: false
    }
  },
  methods: {
    // signOut -> user have to sign in again
    signOut: function() {
      auth.signOut().then(() => {
        alert('You are signed out!')
        this.$router.go('/login')
      })
    }
  }
}
</script>
<style></style>
