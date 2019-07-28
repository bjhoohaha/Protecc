<template>
  <v-container fluid>
    <!-- <img src="../assets/logo.png" /> -->
    <!-- display logo in a row -->
    <v-layout row wrap>
      <!-- title and subtitle -->
      <v-flex xs8>
        <div id="protecc-title">
          Protecc
        </div>
        <br />
        <div id="protecc-subtitle">
          Intrusion Detection System
        </div>
      </v-flex>
      <!-- insert logo -->
      <v-flex xs4>
        <img id="bear-logo" src="../assets/bear-logo.png" />
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: 'logo'
}
</script>
<style scoped>
#protecc-title {
  font-family: 'Bungee Shade';
  font-size: 8vw;
  display: inline;
}
#protecc-subtitle {
  font-family: 'Bungee Inline';
  font-size: 3.5vw; /* 4vw may be used instead*/
  display: inline;
}
#bear-logo {
  display: inline-grid;
  width: 16vw;
}
</style>
