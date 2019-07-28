<template>
  <div id="rule">
    <br />
    <v-subheader class="display-1">
      My Rules
      <v-spacer />
      <v-btn color="green" to="/create">
        Create
      </v-btn>
    </v-subheader>
    <br />
    <v-list subheader three-line>
      <v-list-tile v-bind:key="key" v-for="(rule, key) in savedRules">
        <v-list-tile-action>
          <v-checkbox
            v-model="rule['active']"
            @change="activateRule(rule, key)"
          />
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            {{ rule.name }}
          </v-list-tile-title>
          <v-list-tile-sub-title>
            {{ rule.filter }}
          </v-list-tile-sub-title>
        </v-list-tile-content>
        <router-link
          class="secondary-content"
          v-bind:to="{
            name: 'view-rule',
            params: {
              id: key,
              addr: rule['addr'],
              host: rule['host'],
              name: rule['name'],
              prot: rule['prot']
            }
          }"
        >
          <v-icon>
            create
          </v-icon>
        </router-link>
        <v-icon @click="deleteRule(key)">
          delete
        </v-icon>
      </v-list-tile>
    </v-list>
    <br />
    <br />
    <br />
    <br />
  </div>
</template>
<script>
import firebase from '../firebase'

const db = firebase.db

export default {
  data () {
    return {
      savedRules: {}
    }
  },
  methods: {
    activateRule (rule, key) {
      rule.key = key
      this.$store.dispatch('activateRule', rule)
    },
    deleteRule (key) {
      const uid = this.$store.getters.getUID
      this.$store.dispatch('deleteRule', key)
    }
  },
  created () {
    const uid = this.$store.getters.getUID
    this.$rtdbBind('savedRules', db.ref('users/' + uid + '/rules/saved/'))
  }
}
</script>
<style scoped>
.v-btn {
  font-family: 'Patua One';
  color: white;
}
</style>
