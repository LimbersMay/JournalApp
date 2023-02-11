import {addNewEmptyNote, savingNewNote, setActiveNote, startNewNote} from "../../../src/store/journal";
import {doc, collection, setDoc, deleteDoc, getDocs} from 'firebase/firestore/lite';
import {FirebaseDB} from "../../../src/firebase/config";

describe('Pruebas en Journal Thunks',() => {

    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    test('startNewNote debe crear una nueva nota en blanco', async () => {

        const uid = 'TEST-UID';
        getState.mockReturnValue({auth: {uid}});

        await startNewNote()(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith(savingNewNote());
        expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote({
            body: "",
            title: "",
            imageUrls: [],
            id: expect.any(String),
            date: expect.any(Number)
        }));

        expect(dispatch).toHaveBeenCalledWith(setActiveNote({
            body: "",
            title: "",
            imageUrls: [],
            id: expect.any(String),
            date: expect.any(Number)
        }));

        // Borrar de firebase
        const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
        const docs = await getDocs(collectionRef);

        const deletePromises = [];
        docs.forEach(doc => deletePromises.push(deleteDoc(doc.ref)));

        await Promise.all(deletePromises);
    });
});
