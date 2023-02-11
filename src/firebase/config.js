// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import {getEnvironments} from "../helpers";

const {
    VITE_APIKEY,
    VITE_AUTHDOMAIN,
    VITE_PROJECTID,
    VITE_STORAGEBUCKET,
    VITE_MESSAGINGSENDERID,
    VITE_APPID
} = getEnvironments();

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Dev/Prod
/*const firebaseConfig = {
    apiKey: "AIzaSyBvbsuRFWuHctT5-Ai2_RAPbB17lRIGXec",
    authDomain: "journalapp-8c8a4.firebaseapp.com",
    projectId: "journalapp-8c8a4",
    storageBucket: "journalapp-8c8a4.appspot.com",
    messagingSenderId: "71643800463",
    appId: "1:71643800463:web:18a0ca83e9eae029e9e1fa"
};*/

// Testing
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: VITE_APIKEY,
    authDomain: VITE_AUTHDOMAIN,
    projectId: VITE_PROJECTID,
    storageBucket: VITE_STORAGEBUCKET,
    messagingSenderId: VITE_MESSAGINGSENDERID,
    appId: VITE_APPID
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
