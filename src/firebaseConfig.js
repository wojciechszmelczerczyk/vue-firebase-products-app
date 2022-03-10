import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// firebase configuration
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "vue-firebase-crud-app-60181",
  storageBucket: "your-project-id",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
};

// initialize app with firebase config
const app = initializeApp(firebaseConfig);

// create database
const db = getFirestore(app);

// create auth
const authenticate = getAuth(app);

// export database
export { db, authenticate };
