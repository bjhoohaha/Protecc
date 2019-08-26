<template>
<div class="vld-parent">
  <!-- loading animation -->
  <Loading active id="loader" :width="200" :height="150" :color="'#E91E63'">
  </Loading>
</div>
</template>

<script>
// Import component
import Vue from 'vue'
import Loading from 'vue-loading-overlay';

export default {
  components: {
    Loading
  }
}
</script>
<style>
.vld-parent {
  display: inline-block;
  position: absolute;
  /* set overlay to white with 0.5 opacity */
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 100;
  width: 100%;
  height: 100%;
}

#loader {
  /* position loader center */
  position: sticky;
  margin-left: 43%;
  margin-right: 43%;
  top: 43%;
  bottom: 43%;

}
</style>
