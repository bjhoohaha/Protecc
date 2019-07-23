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
import { FirebaseInit } from './store'
import Login from './components/Login.vue'
import Logo from './components/Logo.vue'
import Navbar from './components/Navbar.vue'
const db = FirebaseInit.db
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
    const ref = db.ref('packets')
    ref
      .once('value')
      .then(snapshot => {
        // if reference to table 'packets' exists
        // commit to Vuex Store
        if (snapshot.exists()) {
          console.log('initialised')
          snapshot.forEach(childSnapshot => {
            const packet = childSnapshot.val()
            packet.key = childSnapshot.key
            // add packet to store
            this.$store.commit('addPacket', packet)
          })
        }
      })
      .then(() => {
        // listen in on new packets added
        // apply functions on the last one
        ref.limitToLast(1).on('child_added', snapshot => {
          console.log('added')
          if (snapshot.exists()) {
            const packet = snapshot.val()
            packet.key = snapshot.key
            // add packet to store
            this.$store.commit('addPacket', packet)
          }
        })
      })
  },
  beforeCreate () {
    this.$store.dispatch('update')
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
