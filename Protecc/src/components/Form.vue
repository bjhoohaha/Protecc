<template>
<div id="rule-form">
  <v-container>
    <div>
      <label>
        <h4>How would you like to filter your packets?</h4>
      </label>
    </div>
    <br />
    <!-- Title -->
    <v-toolbar height="80px" id="rule-name">
      <v-text-field v-model="name" label="Give Your Rule a Name" />
    </v-toolbar>
    <v-card>
      <!-- Form -->
      <v-container>
        <!-- IP Address Input -->
        <v-layout row wrap>
          <v-flex xs12>
            <h6>IP Address:</h6>
          </v-flex>
          <v-flex xs4>
            <v-select prepend-icon="wifi" :items="hostSelect" v-model="host" />
          </v-flex>
          <v-flex xs8>
            <v-text-field type="text" label="Ip Address" v-model="addr" />
          </v-flex>
        </v-layout>
        <!--  Protocol Input -->
        <v-layout row wrap>
          <v-flex xs12>
            <h6>Protocol:</h6>
          </v-flex>
          <v-flex xs4>
            <v-select label="Type" prepend-icon="http" v-model="prot"
                :items="protocolSelect" />
          </v-flex>
          <v-flex xs8>
            <v-text-field type="text" label="Protocol" v-model="prot" />
          </v-flex>
        </v-layout>
        <v-btn color="green" @click="submit()">
          Submit
        </v-btn>
        <v-btn color="green" to="/rules">Back</v-btn>
      </v-container>
    </v-card>
    <br />
    <br />
  </v-container>
</div>
</template>
<script>
import firebase from '../firebase'

const db = firebase.db

export default {
  // props from CreateRule or ViewRule
  props: ['idProp', 'nameProp', 'hostProp', 'addrProp', 'protProp'],
  data() {
    // bind prop to local data
    return {
      id: this.idProp,
      name: this.nameProp,
      host: this.hostProp,
      addr: this.addrProp,
      prot: this.protProp,
      hostSelect: ['Source', 'Destination', 'All'],
      protocolSelect: ['TCP', 'UDP', 'ARP', 'RARP', 'IP', 'IP6']
    }
  },
  computed: {},
  methods: {
    // turn each form input data to arguments for tshark
    parseInput(val, type) {
      const ipRegex =
        /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
      if (type == 'host') {
        if (val == 'Source') return 'src'
        else if (val == 'Destination') return 'dst'
        return 'host'
      }
      if (type == 'prot') {
        return val.toLowerCase()
      }
      if (type == 'addr' && ipRegex.test(val)) {
        return val
      }
      return ''
    },
    // combine each form input data to a single capture filter syntax argument
    // to be passed into tshark
    captureFilter() {
      let output = ''
      if (this.addr != null && this.addr != '') {
        output +=
          this.parseInput(this.host, 'host') +
          ' ' +
          this.parseInput(this.addr, 'addr')
        if (this.prot != null && this.prot != '') {
          output += ' and '
        }
      }
      if (this.prot != null && this.prot != '') {
        output += this.parseInput(this.prot, 'prot')
      }
      return output
    },
    // submit data
    submit() {
      const rule = {}
      // as firebase cannot add null objects
      // hence need to check for identity
      rule['active'] = true
      if (this.name != null) rule['name'] = this.name
      if (this.host != null) rule['host'] = this.host
      if (this.addr != null) rule['addr'] = this.addr
      if (this.prot != null) rule['prot'] = this.prot
      const filter = this.captureFilter()
      if (filter.length > 0) rule['filter'] = filter

      // VueX store support one argument as payload
      // hence store the data inside a object to be passed in
      const obj = {}
      obj.rule = rule
      obj.id = this.id
      this.$store.dispatch('updateRule', obj)

      this.$router.push('/rules')
    }
  }
}
</script>
<style scoped>
.v-btn {
  font-family: 'Patua One';
  color: white;
}
</style>
