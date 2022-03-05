import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// firebase configuration
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
};

// initialize app with firebase config
const app = initializeApp(firebaseConfig);

// create database
const db = getFirestore(app);

// export database
export { db };
