import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMvczw56wA71tlf66M1YfwU5iT_BwjbXQ",
  authDomain: "vue-firebase-crud-app-60181.firebaseapp.com",
  projectId: "vue-firebase-crud-app-60181",
  storageBucket: "vue-firebase-crud-app-60181.appspot.com",
  messagingSenderId: "148760643940",
  appId: "1:148760643940:web:daac5ce6b2b235cd3c5271",
};

// initialize app with firebase config
const app = initializeApp(firebaseConfig);

// create database
const db = getFirestore(app);

// create auth
const authenticate = getAuth(app);

// export database
export { db, authenticate };
