// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfSGBN_7Jax2qBEBToiq4-L5ygfqxAdrE",
  authDomain: "e-commerce-8132b.firebaseapp.com",
  projectId: "e-commerce-8132b",
  storageBucket: "e-commerce-8132b.appspot.com",
  messagingSenderId: "925720027337",
  appId: "1:925720027337:web:4f3bc04513083fcb856d18"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();