import firebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from './FirebaseConfig'
const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.database()
const auth = firebase.auth()
export default { db: db, auth: auth, fb: firebase }
