<template>
  <v-app>
    <div id="app">
      <Logo />
      <Navbar />
      <v-content>
        <router-view />
      </v-content>
      <NewPacket />
    </div>
  </v-app>
</template>

<script>
import firebase from './firebase'
import Login from './components/Login.vue'
import Logo from './components/Logo.vue'
import Navbar from './components/Navbar.vue'
import NewPacket from './components/NewPacket.vue'

const db = firebase.db
export default {
  name: 'App',
  data () {
    return {}
  },
  components: {
    Logo,
    Navbar,
    Login,
    NewPacket
  },
  created () {
    let count = 0
    const currentUser = firebase.auth.currentUser
    if (currentUser) {
      const uid = currentUser.uid
      const ref = db.ref('users/' + uid + '/packets')
      // add a listener to every new packet added to firebase
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
}
</script>
