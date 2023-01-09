import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {FirebaseAuth} from "./config.js";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult( result );
        const { displayName, email, photoURL, uid } = result.user;

        return {
            ok: true,
            // User info
            displayName, email, photoURL, uid
        }
    } catch (error) {
        console.log(error);

        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage
        }
    }
}

export const signInLocal = async({ displayName, email, password }) => {
    try {
        const res = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = res.user;

        // TODO: Actualizar el displayName en firebase
        await updateProfile(FirebaseAuth.currentUser, { displayName });

        return {
            ok: true,
            uid,
            photoURL,
            email,
            displayName
        }

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}
