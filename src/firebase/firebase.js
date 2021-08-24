import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBY7tWgvoz_jO2oAHx0LTA17lM7iF55CmI",
  authDomain: "collab-twire.firebaseapp.com",
  projectId: "collab-twire",
  storageBucket: "collab-twire.appspot.com",
  messagingSenderId: "374058999959",
  appId: "1:374058999959:web:3b8d86fec9a7f8c71109d2",
  measurementId: "G-JJVRB4X2LS",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
