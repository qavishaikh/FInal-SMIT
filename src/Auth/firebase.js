import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyDYqZBY9SKBEe8fSMO6L9nSmak6SdI-g1k",
  authDomain: "final-project-smit-e4974.firebaseapp.com",
  databaseURL: "https://final-project-smit-e4974-default-rtdb.firebaseio.com",
  projectId: "final-project-smit-e4974",
  storageBucket: "final-project-smit-e4974.appspot.com",
  messagingSenderId: "1099015033405",
  appId: "1:1099015033405:web:aa224fa8b9608197c69054"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, database };