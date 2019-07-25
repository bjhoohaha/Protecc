<template>
  <v-app>
    <div id="app">
      <Logo />
      <Navbar />
      <v-content>
        <router-view />
      </v-content>
    </div>
  </v-app>
</template>

<script>
import firebase from './firebase'
import Login from './components/Login.vue'
import Logo from './components/Logo.vue'
import Navbar from './components/Navbar.vue'

const db = firebase.db
export default {
  name: 'App',
  data () {
    return {}
  },
  components: {
    Logo,
    Navbar,
    Login
  },
  created () {
    let count = 0
    this.$store.dispatch('update')
    const ref = db.ref('packets')
    ref.limitToLast(1).on('child_added', snapshot => {
      if (snapshot.exists() && count > 0) {
        console.log('added')
        console.log(snapshot.val())
        const packet = snapshot.val()
        this.$store.dispatch('updateStats', packet)
      }
      count++
    })
    console.log('listening')
  }
}
</script>

<style>
/*
// Align app to take up full view
#app {
  position: absolute;
  width: 100%;
  height: 100%;
}
*/
</style>
