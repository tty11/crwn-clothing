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

export const createUserProfileDocument = async (userAuth, additionalDatas) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get()

  if (!snapShot.exists) {
    const {displayName, email} = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalDatas
      })
    } catch (error) {
      console.log('Error creating user', error.message)
    }
  }

  return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase