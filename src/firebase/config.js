// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBvbsuRFWuHctT5-Ai2_RAPbB17lRIGXec",
    authDomain: "journalapp-8c8a4.firebaseapp.com",
    projectId: "journalapp-8c8a4",
    storageBucket: "journalapp-8c8a4.appspot.com",
    messagingSenderId: "71643800463",
    appId: "1:71643800463:web:18a0ca83e9eae029e9e1fa"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
