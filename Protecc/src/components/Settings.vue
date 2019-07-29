<template>
  <div id="settings">
    <v-container fluid>
      <!-- infinite mode settings -->
      <v-layout row wrap>
        <v-flex xs12>
          Allow infinite packet capture or manually configure the number of
          packets to log
          <br />
        </v-flex>
        <v-flex xs12>
          <!-- switch to toggle infinite mode on / off -->
          <v-switch
            v-model="infinity"
            :label="`Infinity Mode : ${onOff(infinity)}`"
            @change="changeInfinityMode()"
          ></v-switch>
        </v-flex>
        <!-- allow user to configure capture packet count with text input -->
        <v-flex xs11 class="Patua" id="number">
          <div v-if="!edit && !infinity">
            {{ input }}
          </div>
          <!-- text input -->
          <v-text-field
            type="number"
            solo
            flat
            id="text-center"
            v-model:value="input"
            v-if="!infinity && edit"
            :rules="[value => !!value || 'Required.']"
          ></v-text-field>
        </v-flex>
        <v-flex xs1>
          <!-- edit button -->
          <v-btn
            fab
            small
            depressed
            @click="edit = true"
            v-if="edit == false && infinity == false"
          >
            <v-icon>edit</v-icon>
          </v-btn>
          <!-- save button -->
          <v-btn
            fab
            small
            depressed
            @click="submitNumber()"
            v-if="edit == true && infinity == false"
          >
            <v-icon>save</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-divider />
      <v-layout row wrap>
        <!-- settings for rules mode -->
        <v-flex xs12>
          <br />
          Pass in rules for packet caputre
        </v-flex>
        <v-flex xs12>
          <v-switch
            v-model="rules"
            :label="`Rules Mode: ${onOff(rules)}`"
            @change="changeRulesMode()"
          >
          </v-switch>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import firebase from '../firebase'

const db = firebase.db
export default {
  name: 'Settings',
  data () {
    return {
      infinity: true,
      rules: true,
      interval: false,
      input: 1,
      edit: true
    }
  },
  methods: {
    onOff (val) {
      return val == true ? 'On' : 'Off'
    },
    // submit capture packet count to database to save user's settings
    submitNumber () {
      if (this.input > 0) {
        this.edit = false
        this.$store.dispatch('submitNumber', this.input)
      }
    },
    // save user's settings
    changeInfinityMode () {
      this.$store.dispatch('changeInfinityMode', this.infinity)
    },
    changeRulesMode () {
      this.$store.dispatch('changeRulesMode', this.rules)
    }
  },
  created () {
    const uid = firebase.auth.currentUser.uid
    // bind database to each user's settings data in Vue using VueFire
    db.ref('users/' + uid + '/settings').once('value', result => {
      const obj = result.val()
      this.input = obj['infinite']['count']
      this.infinity = obj['infinite']['active']
      this.rules = obj['rules']['active']
    })
  }
}
</script>
<style scoped>
#title {
  font-size: 18px;
}
.Patua {
  font-family: 'Patua One';
}
#number {
  font-size: 30px !important;
  text-align: center;
}

#text-center {
  text-align: center !important;
}
</style>
