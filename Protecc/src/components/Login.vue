<template>
  <div id="login">
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
              <!-- alert -->
              <v-alert v-bind:value="alert" dismissible type="error">
                {{ error }}</v-alert
              >
              <!-- options for email or google login -->
              <p v-if="loginWithEmail">
                <br />
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <!-- login with email button -->
                  <v-btn
                    light
                    color="white"
                    @click="loginWithEmail = !loginWithEmail"
                  >
                    Sign In With Email
                  </v-btn>
                  <v-spacer> or </v-spacer>
                  <!-- login with google button -->
                  <v-btn light color="white" @click="googleLogin()">
                    Sign In With
                    <v-icon right> fa fa-google </v-icon>
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
                <br />
              </p>
              <!-- form -->
              <p v-else>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      v-model="email"
                      prepend-icon="person"
                      name="login"
                      label="Login"
                      type="email"
                    ></v-text-field>
                    <v-text-field
                      v-model="password"
                      id="password"
                      prepend-icon="lock"
                      name="password"
                      label="Password"
                      type="password"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <!-- buttons -->
                <v-card-actions>
                  <!-- back -->
                  <v-btn @click="loginWithEmail = !loginWithEmail" color="white"
                    >Back</v-btn
                  >
                  <!-- create account -->
                  <v-btn light to="/sign-up" color="white"
                    >Create Account</v-btn
                  >
                  <!-- submit form -->
                  <v-spacer></v-spacer>
                  <v-btn dark @click="login()" color="grey darken-2"
                    >Login</v-btn
                  >
                </v-card-actions>
              </p>
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
  name: 'Login',
  data: () => ({
    // toggle overlay true or false
    dialog: true,
    loginWithEmail: true,
    alert: false,
    error: '',
    email: '',
    password: ''
  }),
  props: {
    source: String
  },
  methods: {
    // authenticate firebase login with email and password
    login: function () {
      auth.signInWithEmailAndPassword(this.email, this.password).then(
        result => {
          alert('You have been logged in')
          this.dialog = false
          this.$router.replace('/')
        },
        err => {
          this.alert = true
          this.err = err.message
        }
      )
    },
    // authenticate google login
    googleLogin: function () {
      const provider = new FirebaseInit.fb.auth.GoogleAuthProvider()
      // sign in with popup
      auth.signInWithPopup(provider).then(
        result => {
          // console.log(result)
          const displayName =
            result.user.displayName == null
              ? 'You have'
              : result.user.displayName + ' has'
          alert(displayName + ' logged in')
          this.dialog = false
          this.$router.replace('/')
        },
        err => {
          this.alert = true
          this.error = err.message
        }
      )
    }
  }
}
</script>
<style scoped>
.container {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5); /* Black background with opacity */
}
.v-toolbar__title {
  font-family: 'Patua One';
}
.spacer {
  text-align: center; /* align 'or'*/
}
</style>
