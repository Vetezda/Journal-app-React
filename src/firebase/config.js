// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { getEnvironments } from "../helpers/getEnvironments";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//console.log(import.meta.env.VITE_FIREBASE_API_KEY);
//console.log(import.meta.env);
//console.log(process.env);

const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID
} = getEnvironments();


// Your web app's Firebase configuration

//dev/prod
//const firebaseConfig = {
//  apiKey: "AIzaSyBV8aMPOvfBfbfJhQ5qen_Kr25zN2xKlGc",
//  authDomain: "react-journal-app-39d5e.firebaseapp.com",
//  projectId: "react-journal-app-39d5e",
//  storageBucket: "react-journal-app-39d5e.appspot.com",
//  messagingSenderId: "990635002819",
//  appId: "1:990635002819:web:a52e19964f8639aff84b76"
//};

//Testing
const firebaseConfig = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGINGSENDERID,
  appId: VITE_APPID
};

// Initialize Firebase
export const FirebaseApp = initializeApp( firebaseConfig );
export const FirebaseAuth =  getAuth( FirebaseApp );
export const FirebaseDB =  getFirestore( FirebaseApp );

