import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBGTBlEXyzJngPSGJiVu65IMSB2S0DXib4",
  authDomain: "fir-tutorial-ninja-e1c22.firebaseapp.com",
  projectId: "fir-tutorial-ninja-e1c22",
  storageBucket: "fir-tutorial-ninja-e1c22.appspot.com",
  messagingSenderId: "841662252681",
  appId: "1:841662252681:web:dd4a1fa2ec20725455a858",
  measurementId: "G-QV5FEF6TP6",
};

firebase.initializeApp(firebaseConfig);
export default firebase;
