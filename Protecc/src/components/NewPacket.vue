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
    <div v-if="ready">
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
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import firebase from '../firebase'

const url = 'http://localhost:4000/capture'
const db = firebase.db

export default {
  name: 'new-packet',
  data () {
    return {
      dialog: false,
      message: '',
      error: '',
      capture: 'false',
      settings: {},
      rules: {},
      ready: false
    }
  },
  computed: {
    getCountOption () {
      if (this.settings) {
        const infinite = this.settings['infinite']
        if (infinite != null && infinite['active'] == false) {
          return '-c ' + infinite['count']
        }
      }
      return ''
    },
    getFilterOptions () {
      const filter = Object.values(this.rules)
        .map(rule => rule.filter)
        .join(' or ')

      if (this.settings['rules']) {
        const rules = this.settings['rules']
        if (rules != null && rules['active'] == true && filter != '') {
          return '-f ' + filter
        }
      }
      return ''
    }
  },
  methods: {
    runTshark () {
      this.dialog = false
      this.capture = !this.capture
      const uid = this.$store.getters.getUID
      // POST request to start logging packet
      return axios
        .post(url, {
          count: this.getCountOption,
          uid: uid,
          filter: this.getFilterOptions
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
  },
  created () {
    const uid = this.$store.getters.getUID
    this.$rtdbBind('settings', db.ref('users/' + uid + '/settings'))
    this.$rtdbBind('rules', db.ref('users/' + uid + '/rules/active'))
  },
  watch: {
    settings: function () {
      this.ready = true
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
