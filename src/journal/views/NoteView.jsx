import { useMemo, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SaveOutlined, UploadOutlined, DeleteOutline } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography} from '@mui/material';

import { useForm } from '../../hooks/useForm';
import { ImageGallery } from '../components'
import { setActiveNote } from '../../store/journal/journalSlice';
import { startUploadFileToCloudinary, startSaveNote, startDeleteActiveNote } from '../../store/journal/thunks';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

export const NoteView = () => {

    const dispatch = useDispatch();

    const { activeNote, messageSaved, isSaving } = useSelector(state => state.journal)
    
    const { body, title, date, formState, onInputChange } = useForm(activeNote);

    const dateFormat = useMemo(() => {//cuando se selecciona otra nota, el date cambia, hay que detectar ese cambio y hacer que se ejecute la funcion toUTCString(),la cual le da diferentes formatos al date
        const newDate = new Date( date );
        return newDate.toUTCString();
    }, [date]);

    useEffect(() => {
        dispatch( setActiveNote( formState ) );
    }, [formState]);

    useEffect(() => {
        if ( messageSaved.length > 0 ) {
            Swal.fire( 'Nota actualizada', messageSaved, 'success' );
        }
    }, [messageSaved]);

    const onSaveNote = () => {
        dispatch( startSaveNote() );
    }

    const fileInputRef = useRef();

    const onFileInputChange = ({target}) => {
        if (target.files === 0) return;

        dispatch( startUploadFileToCloudinary( target.files ) );
    }

    const onDeleteActiveNote = () => {
        dispatch( startDeleteActiveNote() );
    }


  return (
    <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
        <Grid item>
            <Typography fontSize={ 39 } fontWeight='light' >{ dateFormat }</Typography>
        </Grid>
        <Grid item>

            <input 
                ref={ fileInputRef }
                onChange={ onFileInputChange }
                style={ {display: 'none'} }
                type="file"
                multiple
            />

            <IconButton color= "primary" disabled={ isSaving } onClick={() => fileInputRef.current.click()}>
                <UploadOutlined />
            </IconButton>

            <Button
                disabled={ isSaving } 
                onClick={ onSaveNote } 
                color="primary" 
                sx={{ padding: 2 }}>
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField 
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese un título"
                label="Título"
                sx={{ border: 'none', mb: 1 }}
                name="title"
                value={ title }
                onChange={ onInputChange }
            />

            <TextField 
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="¿Qué sucedió en el día de hoy?"
                minRows={ 5 }
                name="body"
                value={ body }
                onChange={ onInputChange }
            />
        </Grid>


        {/* Image gallery */}
        <ImageGallery images={ activeNote.imageUrls } />

        <Grid container justifyContent='start' >
            <Button 
                onClick={ onDeleteActiveNote }
                sx={{ mt: 2 }}
                color="error">
                    <DeleteOutline />
                    Borrar Nota
            </Button>
        </Grid>
    </Grid>
  )
}
