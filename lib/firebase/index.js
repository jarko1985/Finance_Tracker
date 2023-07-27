// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBffXMUoLR7yKkQUifglmdPTEz6lxrvVXE",
  authDomain: "finance-tracker-c583f.firebaseapp.com",
  projectId: "finance-tracker-c583f",
  storageBucket: "finance-tracker-c583f.appspot.com",
  messagingSenderId: "953564299181",
  appId: "1:953564299181:web:9c1e0f5ce0900134daab24",
  measurementId: "G-F7W8MFG2VV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
