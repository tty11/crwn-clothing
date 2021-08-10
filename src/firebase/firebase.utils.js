import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyDptZcrCL3qgN7kBTUOaVigWjr8AsmjfoI",
    authDomain: "crown-db-f8dc4.firebaseapp.com",
    projectId: "crown-db-f8dc4",
    storageBucket: "crown-db-f8dc4.appspot.com",
    messagingSenderId: "446241635321",
    appId: "1:446241635321:web:f93f6bbefe54bfc07f5b28",
    measurementId: "G-3YTPCFMHNB"
}

firebase.initializeApp(config)

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase