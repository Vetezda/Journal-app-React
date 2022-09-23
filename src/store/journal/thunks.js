import { doc, collection, setDoc, deleteDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { fileUploadCloudinary } from '../../helpers/fileUploadCloudinary';
import { loadNotesFromDB } from '../../helpers/loadNotesFromDB';
import { addNewNote, 
         setActiveNote, 
         delayByCreationNewNote, 
         loadNotes, 
         setSavingNote, 
         updateNote, 
         setPhotosToActiveNote,
         deleteActiveNoteById } from './journalSlice';

export const startAddNewNote = () => {

    //Guardar una newNote en FireStore
    return async( dispatch, getState ) => {
        
        dispatch( delayByCreationNewNote() );
        
        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imageUrls: []  
        }

        const newDocument = doc( collection( FirebaseDB, `${ uid }/journal/notes`  ) );
        await setDoc( newDocument, newNote );
        
        newNote.id = newDocument.id;

        dispatch( addNewNote( newNote ) );
        dispatch( setActiveNote( newNote ) );
    }
}

//Cargar las notas guardadas en FireStore
export const startLoadingNotes = () => {

    return async ( dispatch, getState ) => {
        const { uid } = getState().auth;
        if( !uid ) throw new Error( 'El UID del usario no existe' );
        const notes = await loadNotesFromDB( uid );

        dispatch( loadNotes( notes ) );
    }

}

//Guardar una note, sea nueva (newNote) o seleccionada(activeNote) es decir la actualiza
export const startSaveNote = () => {
    return async ( dispatch, getState ) => {

        dispatch( setSavingNote())
        
        const { uid } = getState().auth;
        const { activeNote } = getState().journal;
        
        const noteToFireStore = { ...activeNote };
        delete noteToFireStore.id;
        
        const docRef = doc(  FirebaseDB, `${ uid }/journal/notes/${ activeNote.id }` );
        await setDoc( docRef, noteToFireStore, { merge: true } );
        
        dispatch(updateNote(activeNote));//Actualiza las notes en el noteView cuando son modificadas
        
    }
}


export const startUploadFileToCloudinary = ( files = [] ) => {
    return async ( dispatch ) => {
        dispatch( setSavingNote());
        
        //await fileUploadCloudinary( files[0] );
        
        const fileUploadPromises = [];//Arreglo de promesas
        for ( const file of files ) {
            fileUploadPromises.push( fileUploadCloudinary( file ) );
        }
        
        const photosUrls = await Promise.all( fileUploadPromises );
        
        dispatch( setPhotosToActiveNote( photosUrls ) );
    }
}

export const startDeleteActiveNote = ( files = [] ) => {
    return async ( dispatch, getState ) => {
        const { uid } = getState().auth;
        const { activeNote } = getState().journal;
        
        const docRef = doc(  FirebaseDB, `${ uid }/journal/notes/${ activeNote.id }` );
        await deleteDoc( docRef );
        const notes = await loadNotesFromDB( uid );

        dispatch( deleteActiveNoteById( activeNote.id ) );
        dispatch( loadNotes( notes ) );
    }
} 


