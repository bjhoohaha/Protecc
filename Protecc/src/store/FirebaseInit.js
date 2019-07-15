import firebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from './FirebaseConfig'
const firebaseApp = firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()
const db = firebaseApp.database()
export default { db: db, auth: auth }
