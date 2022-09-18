import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyBcA4zqv3MQbnQXWK1USfQYPSYZNv2p9aI",
    authDomain: "sharepj-54381.firebaseapp.com",
    projectId: "sharepj-54381",
    storageBucket: "sharepj-54381.appspot.com",
    messagingSenderId: "1035539799327",
    appId: "1:1035539799327:web:694c930e5fb2a89f89642a",
    measurementId: "G-SP4XE16MV4"
  })
}

export default firebase
