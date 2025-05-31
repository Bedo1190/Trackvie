// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWsbx25-ckblcM3CRb9tOwccsPj9p_OFE",
  authDomain: "trackvie-c3ef1.firebaseapp.com",
  projectId: "trackvie-c3ef1",
  storageBucket: "trackvie-c3ef1.firebasestorage.app",
  messagingSenderId: "387758222550",
  appId: "1:387758222550:web:3a23926b84ac38a833ed77",
  measurementId: "G-K0D36XK5YX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };