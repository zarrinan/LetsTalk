import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyC9xnXJs1ygT6sYK29Scd_l8M_-HA3z7Wo",
  authDomain: "zarrina-social.firebaseapp.com",
  databaseURL: "https://zarrina-social.firebaseio.com",
  projectId: "zarrina-social",
  storageBucket: "zarrina-social.appspot.com",
  messagingSenderId: "331274854408"
}

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth

export const usersPostsExpirationLength = 10000
export const userExpirationLength = 10000
export const repliesExpirationLength = 300000
