<template>
  <div id="navbar">
    <v-tabs background color="pink lighten-1" dark>
      <v-tab to="/home"> Home </v-tab>
      <v-tab to="/stats"> Stats </v-tab>
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
export default {
  name: 'navbar',
  data () {
    return {
      overlay: false
    }
  }
}
</script>
<style></style>
