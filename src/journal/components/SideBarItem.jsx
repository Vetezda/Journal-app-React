import React, { useMemo } from 'react'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { TurnedInNot } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { setActiveNote } from '../../store/journal/journalSlice';

export const SideBarItem = ({id, title, body, date, imageUrls = []}) => {

    const dispatch = useDispatch();

    const onClickNote = () => {

        dispatch( setActiveNote( {id, title, body, date, imageUrls} ) );

    }



    //reducir el title a no mas de 17 caracteres por tema de estateica 
    const limitedTitle = useMemo(() => {
        return title.length > 17
                    ? title.substring(0,17) + '...'
                    : title;
    }, [title]);

  return (
    <ListItem key={ id } disablePadding>
        <ListItemButton onClick = {onClickNote} >
            <ListItemIcon>
                <TurnedInNot />
            </ListItemIcon>
            <Grid container>
                <ListItemText primary={ limitedTitle } />
                <ListItemText secondary={ body } />
            </Grid>
        </ListItemButton>
    </ListItem>
 )  
}
