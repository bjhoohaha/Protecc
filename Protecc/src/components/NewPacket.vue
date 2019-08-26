<template>
<div id="new-packet">
  <!-- Error message if unable to connect to express router -->
  <v-dialog :value="dialog">
    <v-card>
      <v-toolbar>
        <v-card-title id="title">
          <strong> ERROR {{ error }} </strong>
        </v-card-title>
      </v-toolbar>
      <v-alert id="message" :value="true" color="blue-grey lighten-2">
        {{ message }}
      </v-alert>
      <img id="bear-logo" src="../assets/error-display.png" />
    </v-card>
  </v-dialog>
  <!-- allow start /stop capture only after settings are initialized -->
  <div v-if="ready">
    <!-- start capture button -->
    <v-btn v-if="getCaptureStatus" @click="toggleCapture" fab right bottom fixed
        rounded color="green darken-1">
      START
    </v-btn>
    <!-- stop capture button -->
    <v-btn v-else @click="toggleCapture" fab right large bottom fixed rounded
        color="red darken-1">
      STOP
    </v-btn>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import firebase from '../firebase'

// express router
const url = 'http://localhost:4000/capture'
const db = firebase.db

export default {
  name: 'new-packet',
  data() {
    return {
      // toggle dialog overlay true or false
      dialog: false,
      // error message
      message: '',
      error: '',
      settings: {},
      rules: {},
      // allow start / stop capture when ready
      ready: false
    }
  },
  computed: {
    // get previous / saved capture status from store (if user refresh page)
    // used to toggle run / stop tshark
    getCaptureStatus() {
      return this.$store.getters.getCaptureStatus
    },
    // tshark allow users to indicate capture packet count with '-c'
    // turn user's settings to arguments for tshark
    getCountOption() {
      if (this.settings) {
        const infinite = this.settings['infinite']
        if (infinite != null && infinite['active'] == false) {
          return '-c ' + infinite['count']
        }
      }
      return ''
    },
    // tshark allow users to configure their own capture filter
    // turn user's rules to arguments for tshark
    getFilterOptions() {
      const filter = Object.values(this.rules)
        .map(rule => {
          return rule.filter
        })
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
    // toggle capture' status in Vuex Store
    // this will determine whether start / stop is display during a page refresh
    toggleCapture() {
      this.$store.commit('toggleCapture')
    },
    runTshark() {
      // show loading animation
      this.$store.commit('showLoadingOverlay')
      const uid = this.$store.getters.getUID
      // use axios to submit a POST request
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
            this.dialog = true
            const status = err.request.status
            this.error = '' + err.rquest.status
            // '' + err.request.status + ' : ' + err.request.statusText
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
    killTshark() {
      // use axios to send a delete request
      axios.delete(url).then(
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
  created() {
    const uid = this.$store.getters.getUID
    const self = this
    db.ref('users/' + uid + '/settings')
      .once('value', result => {
        // new users may not have settings initialized
        // hence check if 'settings' exists in database for current user
        if (!result.hasChildren()) {
          this.$store.dispatch('initializeSettings')
        }
      })
      .then(() => {
        // bind settings and rules to database user's saved settings with VueFire
        this.$rtdbBind('settings', db.ref('users/' + uid + '/settings'))
        this.$rtdbBind('rules', db.ref('users/' + uid + '/rules/active'))
      })
  },
  watch: {
    // Watch for changes in settings
    // Allow packet capture when settings finish initialize
    settings: function() {
      this.ready = true
    },
    // the capture status will determine what will be run
    getCaptureStatus: function(captureStatus) {
      if (!this.$store.getters.getCaptureStatus) {
        this.runTshark()
      } else {
        this.killTshark()
      }
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
