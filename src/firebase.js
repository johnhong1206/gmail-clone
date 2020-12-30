import firebase from "firebase";
import "firebase/analytics";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZFvITIGdw-t_ZOTGV-Bjy67fwr1E3uhA",
  authDomain: "zonghong-c19ad.firebaseapp.com",
  projectId: "zonghong-c19ad",
  storageBucket: "zonghong-c19ad.appspot.com",
  messagingSenderId: "499193547793",
  appId: "1:499193547793:web:4f430fe0a2c1f1747ab5b0",
  measurementId: "G-3W7YLSZ7WY",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics();

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { db, auth, provider, storage, analytics };
