import firebase from "firebase/app";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDkp0RpTQPoXjS2nNKj1wAzqsVNHwTy8xw",
  authDomain: "contacts-d638c.firebaseapp.com",
  projectId: "contacts-d638c",
  storageBucket: "contacts-d638c.appspot.com",
  messagingSenderId: "302907152102",
  appId: "1:302907152102:web:dd2c2f7f7970abcca88d27",
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
export const db = fb.firestore();

// export default db;
