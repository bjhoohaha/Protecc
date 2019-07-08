import firebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from './firebaseConfig'
const firebaseApp = firebase.initializeApp(firebaseConfig)
export const auth = firebase.auth()
export const db = firebaseApp.database()
