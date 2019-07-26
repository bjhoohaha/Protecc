<template>
  <div id="new-packet">
    <v-dialog :value="dialog">
      <v-card>
        <v-toolbar>
          <v-card-title id="title"
            ><strong>ERROR {{ error }}</strong></v-card-title
          >
        </v-toolbar>
        <v-alert id="message" :value="true" color="blue-grey lighten-2">
          {{ message }}
        </v-alert>
        <img id="bear-logo" src="../assets/error-display.png" />
      </v-card>
    </v-dialog>
    <v-btn
      v-if="capture"
      @click="runTshark"
      fab
      right
      bottom
      fixed
      rounded
      color="green darken-1"
    >
      START
    </v-btn>
    <v-btn
      v-else
      @click="killTshark"
      fab
      right
      :value="false"
      large
      bottom
      fixed
      rounded
      color="red darken-1"
    >
      STOP
    </v-btn>
    <!-- <v-btn> START CAPTURE </v-btn>
    <button @click="runTshark" class="btn">Start</button>
    <button @click="killTshark" class="btn green">Stop</button> -->
  </div>
</template>

<script>
import axios from 'axios'
const url = 'http://localhost:4000/capture'

export default {
  name: 'new-packet',
  data () {
    return {
      dialog: false,
      message: '',
      error: '',
      capture: 'false'
    }
  },
  methods: {
    runTshark () {
      this.dialog = false
      this.capture = !this.capture
      // POST request to start logging packets
      return axios
        .post(url, {
          params: '10'
        })
        .then(
          result => {
            console.log(result)
          },
          err => {
            console.log(err.response)
            this.capture = !this.capture
            this.dialog = true
            const status = err.request.status
            this.error =
              '' + err.request.status + ' : ' + err.request.statusText
            if (status == 400) {
              this.message =
                'tshark was spawned but unable to capture because of invalid arguments. Please check your rules again.'
            } else if (status == 500) {
              this.message =
                'tshark failed to spawn. Please check whether you have installed tshark'
            } else {
              this.message = 'Oops something went wrong. Please try again.'
            }
          }
        )
    },
    // DELETE request to kill logging process
    killTshark () {
      this.capture = !this.capture
      return axios.delete(url).then(
        result => {
          this.message = 'killed'
          console.log(result)
        },
        err => {
          console.log(err.response)
        }
      )
    }
  }
}
</script>
<style scoped>
.v-btn {
  color: white;
  font-family: 'Patua One';
}

#title {
  font-family: 'Patua One';
  font-size: 25px;
}

#message {
  font-size: 18px;
}
</style>
