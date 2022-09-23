import { createSlice } from '@reduxjs/toolkit'

export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: false,
    messageSaved: '',
    notes: [],
    activeNote: null
        //activeNote: {
        //    id: '1hj23h',
        //    title: '',
        //    body: '',
        //    date: '',
        //    imageUrls: [], //https://foto1.jpg, https://foto2.jpg, https://foto2.jpg,
        //}
  },
  reducers: {
    addNewNote: (state, action) => {
        state.notes.push( action.payload );
        state.isSaving = false;
    },
    setActiveNote: (state, action) => {
        state.activeNote = action.payload;
        state.messageSaved = '';
    },
    loadNotes: (state, action) => {
        state.notes = action.payload;
        
    },
    setSavingNote: (state) => {
        state.isSaving = true;
        state.messageSaved = '';
    },
    updateNote: (state, action) => {

        state.isSaving = false;
        state.notes = state.notes.map( ( note ) => {
          if (note.id === action.payload.id) {
              return action.payload;
          };
          return note;

        });

        state.messageSaved = `${ action.payload.title}, actualizada correctamente`;
    },
    setPhotosToActiveNote: (state, action) => {
        state.activeNote.imageUrls = [ ...state.activeNote.imageUrls, ...action.payload ];
        state.isSaving = false;
    },
    clearNotesLogout: (state) => {
        state.isSaving = false;
        state.messageSaved = '';
        state.notes = [];
        state.activeNote = null;
    },
    deleteActiveNoteById: (state, action) => {
        state.notes = state.notes.filter( ( note ) => note.id === action.payload );
        state.activeNote = null;
    },
    delayByCreationNewNote: (state, action) => {
        state.isSaving = true;
    },
  }
});

export const { addNewNote,
               setActiveNote,
               loadNotes,
               setSavingNote,
               updateNote,
               deleteActiveNoteById,
               delayByCreationNewNote,
               setPhotosToActiveNote,
               clearNotesLogout } = journalSlice.actions;