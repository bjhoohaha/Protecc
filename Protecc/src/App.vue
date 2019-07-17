<template>
  <v-app>
    <div id="app">
      <!-- if using login as overlay -->
      <!-- <Login /> -->
      <Logo />
      <Navbar />
      <v-content>
        <router-view />
      </v-content>
    </div>
  </v-app>
</template>

<script>
import Login from './components/Login.vue'
import Logo from './components/Logo.vue'
import Navbar from './components/Navbar.vue'
export default {
  name: 'App',
  data () {
    return {}
  },
  components: {
    Logo,
    Navbar,
    Login
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
