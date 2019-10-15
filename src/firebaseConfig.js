import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth';

// firebase init goes here
const config = {
	apiKey: "AIzaSyDY6BUnXBif2-2OncMk4Cw2oP9Q3BsGjj0",
    authDomain: "tarea3webavanzada.firebaseapp.com",
    databaseURL: "https://tarea3webavanzada.firebaseio.com",
    projectId: "tarea3webavanzada",
    storageBucket: "tarea3webavanzada.appspot.com",
    messagingSenderId: "894095532908",
    appId: "1:894095532908:web:70c423a515db856c378949",
    measurementId: "G-6TV7377Y2Z"
}
firebase.initializeApp(config);

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {
    timestampsInSnapshots: true
}
db.settings(settings)

// firebase collections
const usersCollection = db.collection('users')
/* const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes') */

export {
    db,
    auth,
    currentUser,
    usersCollection,
    /* postsCollection,
    commentsCollection,
    likesCollection
    */
} 