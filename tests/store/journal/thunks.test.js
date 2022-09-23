import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../src/firebase/config";
import { addNewNote, delayByCreationNewNote, setActiveNote } from "../../../src/store/journal/journalSlice";
import { startAddNewNote } from "../../../src/store/journal/thunks";


describe('Pruebas en Journal - thunks', () => { 
    
    const dispatch = jest.fn();
    const getState = jest.fn();

    const note = {
        id: expect.any(String),
        title: '',
        body: '',
        date: expect.any(Number),
        imageUrls: []  
    }

    beforeEach( () => jest.clearAllMocks() );

    test('startAddNewNote debe crear una nueva nota en blanco', async() => { 

        const uid = '123456';
        getState.mockReturnValue({ auth: { uid } });

        await startAddNewNote()(dispatch, getState);
        
        expect(dispatch).toHaveBeenCalledWith( delayByCreationNewNote() );
        expect(dispatch).toHaveBeenCalledWith( addNewNote( note ) );
        expect(dispatch).toHaveBeenCalledWith( setActiveNote( note ) );

        //Borrar de firebase
        const collectionRef = collection( FirebaseDB, `${ uid }/journal/notes` );
        const docs = await getDocs( collectionRef );
        
        const deletePromises = [];
        docs.forEach( doc => deletePromises.push( deleteDoc( doc.ref ) ) );
        await Promise.all( deletePromises );
        
     })

 })