<template>
  <div id="sign-up">
    <v-dialog fullscreen v-bind:value="dialog">
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <!-- toolbar -->
              <v-toolbar dark color="grey darken-2">
                <v-toolbar-title>Protecc</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <!-- form -->
              <v-card-text>
                <!-- alert -->
                <p>
                  <!-- output error message by 400 sever response -->
                  <v-alert v-bind:value="bounce" type="error" dismissible>
                    {{ message }}
                  </v-alert>
                  <v-alert v-bind:value="validate" type="warning" dismissible>
                    Password is not identical
                  </v-alert>
                  <v-alert v-bind:value="missing" type="warning" dismissible>
                    Missing fields
                  </v-alert>
                </p>
                <!-- text field -->
                <v-form>
                  <v-text-field
                    v-model="email"
                    prepend-icon="mail"
                    name="login"
                    label="Email"
                    type="email"
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    prepend-icon="vpn_key"
                    name="password"
                    label="Password"
                    type="password"
                    hint="Password must be at least 6 characters"
                  ></v-text-field>
                  <v-text-field
                    v-model="check_password"
                    prepend-icon="check"
                    name="password"
                    label="Confirm Password"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <!-- button -->
              <v-card-actions>
                <v-btn @click="dialog = false" to="/login" color="white"
                  >Sign In Instead</v-btn
                >
                <v-spacer></v-spacer>
                <v-btn dark @click="signUp()" color="grey darken-2"
                  >Sign Up</v-btn
                >
              </v-card-actions>
              <!-- end of form -->
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-dialog>
  </div>
</template>
<script>
import { FirebaseInit } from '../store'
const auth = FirebaseInit.auth
export default {
  name: 'SignUp',
  data: () => ({
    // toggle dialog
    dialog: true,
    email: '',
    password: '',
    check_password: '',
    message: '',
    // show missing field alert
    missing: false,
    // show password validation alert
    validate: false,
    // show server 400 error bounce back alert
    bounce: false
  }),
  props: {
    source: String
  },
  methods: {
    signUp: function () {
      // pointer to outside this
      const self = this
      if (this.validateAll) {
        // reference email and password from data()
        auth.createUserWithEmailAndPassword(this.email, this.password).then(
          function (result) {
            // redirect
            self.$router.push('/')
          },
          function (err) {
            self.bounce = true
            // update error message to alert
            self.message = err.message
          }
        )
      }
    }
  },
  computed: {
    // validations for input
    validateAll: function () {
      this.missing =
        this.email.length == 0 ||
        this.password.length == 0 ||
        this.check_password.length == 0
      this.validate = this.check_password != this.password
      return !this.missing && !this.validate
    }
  }
}
</script>
<style scoped>
.container {
  background-color: rgba(
    255,
    255,
    255,
    0.5
  ); /* Black background with opacity */
}
.v-toolbar__title {
  font-family: 'Patua One';
}
</style>
