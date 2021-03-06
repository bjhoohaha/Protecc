const firebase = require('firebase')
const config = {
  apiKey: 'AIzaSyBErUYGNUmFcbEg-nGY_HOO0tu2KcO0AUY',
  authDomain: 'employee-manager-66213.firebaseapp.com',
  databaseURL: 'https://employee-manager-66213.firebaseio.com',
  projectId: 'employee-manager-66213',
  storageBucket: 'employee-manager-66213.appspot.com',
  messagingSenderId: '909669458330',
  appId: '1:909669458330:web:5e65236fc44dcb75'
}

const app = firebase.initializeApp(config)
const db = app.database()
const auth = firebase.auth()
const fb = firebase
const {
  currentUser
} = auth
// export firebase object that has been initialized to Vue components
export default {
  app,
  auth,
  db,
  fb,
  currentUser
}