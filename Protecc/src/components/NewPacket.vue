<template>
  <div id="new-packet">
    <h1>{{ count }}</h1>
    <h1>{{ message }}</h1>
    <h3>Start/Stop Analysis</h3>
    <button @click="runTshark" class="btn">Start</button>
    <button @click="killTshark" class="btn green">Stop</button>
  </div>
</template>

<script>
import axios from 'axios'
const url = 'http://localhost:4000/capture'

export default {
  name: 'new-packet',
  data () {
    return {
      count: 0,
      message: '',
      error: ''
    }
  },
  methods: {
    runTshark () {
      // POST request to start logging packets
      return axios.post(url).then(
        result => {
          console.log(result)
        },
        err => {
          console.log(err.response)
          this.error = err
        }
      )
    },
    // DELETE request to kill logging process
    killTshark () {
      return axios.delete(url).then(
        result => {
          this.message = 'killed'
          console.log(result)
        },
        err => {
          console.log(err.response)
          this.error = err
        }
      )
    }
  }
}
</script>
