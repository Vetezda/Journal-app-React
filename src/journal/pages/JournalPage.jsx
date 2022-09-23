import { IconButton } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';

import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';
import { useDispatch, useSelector } from 'react-redux';
import { startAddNewNote } from '../../store/journal/thunks';

export const JournalPage = () => {

  const { isSaving, activeNote } = useSelector( state => state.journal );

  const dispatch = useDispatch();

  const onClickAddNewNote = () => {

    dispatch( startAddNewNote() );

  }
  return (
    <JournalLayout>
      
      {/* <Typography>Sint id officia amet velit do aliqua aliqua est ea velit minim voluptate duis laboris. Esse esse consectetur ullamco excepteur ullamco amet. Mollit est nostrud nisi irure magna dolor eiusmod aliquip aliqua nostrud incididunt enim. Velit ipsum laborum Lorem anim laboris aute ullamco ipsum do adipisicing irure.</Typography> */}

      {
        ( !!activeNote )
          ? <NoteView />
          : <NothingSelectedView />
      }
       


      <IconButton
        disabled={ isSaving }
        onClick={ onClickAddNewNote }
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'success.main',
          ':hover': { backgroundColor: 'success.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>

    </JournalLayout>
  )
}
