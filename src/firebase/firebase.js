// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCU-OA639DULdiKgZpbt4ec-i7STqymYZU",
  authDomain: "health-watch-d336e.firebaseapp.com",
  projectId: "health-watch-d336e",
  storageBucket: "health-watch-d336e.appspot.com",
  messagingSenderId: "653685400120",
  appId: "1:653685400120:web:c081b52fa64a98e99bfccd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
