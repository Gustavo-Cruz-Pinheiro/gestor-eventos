// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUM87uGJj0JB_cAGlNm-iKfp5N0if-UDM",
  authDomain: "atividade-final-955d3.firebaseapp.com",
  projectId: "atividade-final-955d3",
  storageBucket: "atividade-final-955d3.appspot.com",
  messagingSenderId: "859963801139",
  appId: "1:859963801139:web:6f9333ce054ba633a32d46"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db }