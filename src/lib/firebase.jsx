// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import firebase from "firebase/compat/app";
// Required for side-effects
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNkb-AjQZVifqFPHefENjP35WFjFUMK9Q",
  authDomain: "ecommerce-eb265.firebaseapp.com",
  projectId: "ecommerce-eb265",
  storageBucket: "ecommerce-eb265.appspot.com",
  messagingSenderId: "168113035216",
  appId: "1:168113035216:web:e6364b99f6a808bf404bd5",
  measurementId: "G-WFEZV9JTGG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage();
export const analytics = getAnalytics(app);