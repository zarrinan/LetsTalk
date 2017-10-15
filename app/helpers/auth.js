import { ref, firebaseAuth } from 'config/constants'
import firebase from 'firebase'

export default function auth () {
  return firebaseAuth().signInWithPopup(new firebase.auth.FacebookAuthProvider())
}

export function checkIfAuthed (store) {
  return store.getState().users.isAuthed === true
}

export function logout () {
  return firebaseAuth().signOut()
}

// ref is our root URL in firebase, by stating ref.child() we say to nest itself into database
export function saveUser (user) {
  return ref.child(`users/${user.uid}`)
  // this going to save user in our database
    .set(user)
    .then(() => user)
}
