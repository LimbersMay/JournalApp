

import { doc, collection, setDoc } from 'firebase/firestore/lite';
import {FirebaseDB} from "../../firebase/config.js";
import {addNewEmptyNote, savingNewNote, setActiveNote} from "./";
export const startNewNote = () => {
    return async(dispatch, getState) => {

        dispatch(savingNewNote());

        const { uid } = getState().auth;
        console.log(uid);
        // user uid

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const newDoc = doc( collection( FirebaseDB,`${uid}/journal/notes`));
        await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;

        // dispatch
        dispatch(addNewEmptyNote(newNote));
        dispatch (setActiveNote(newNote));
    }
}

export const startLoadingNotes = () => {
  
}
