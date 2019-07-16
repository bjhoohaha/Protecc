<template>
  <div id="app">
    <logo />
    <navbar />
    <router-view />
  </div>
</template>

<script>
import Logo from './components/Logo.vue'
import Navbar from './components/Navbar.vue'
export default {
  name: 'App',
  components: {
    Logo,
    Navbar
  }
}
</script>

<style></style>
