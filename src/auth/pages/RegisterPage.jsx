import { useState, useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Link, TextField, Typography, Alert } from '@mui/material';
import { Google } from '@mui/icons-material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { startRegisterUserWithEmailPassword } from '../../store/auth/thunks';
import { initializeUseSelector } from 'react-redux/es/hooks/useSelector';


export const RegisterPage = () => {

  const dispatch = useDispatch();

  const datosDePrueba = {
      email: '',
      password: '',
      displayName: ''
  };

  const { status, errorMessage } = useSelector( state => state.auth );
  const isCheckingAuthentication = useMemo( () => status === 'checking', [status] );


  const formValidations = {
    email: [ (value) => value.includes('@'), 'El correo debe tener un @' ],
    password: [ (value) => value.length >= 6, 'El password debe tener mas de 6 caracteres' ],
    displayName: [ (value) => value.length >= 1, 'Debe escribir un nombre' ],
  }

  const { displayName, email, password, onInputChange, formState, 
      displayNameValid, emailValid, passwordValid, formStateValid, isFormValid
        } = useForm(datosDePrueba, formValidations);

  const [formSubmited, setformSubmited] = useState(false);      

  const onSubmit = (event) => {
    event.preventDefault();

    setformSubmited( true );//para comprobar si el boton de registrar ya fue clickeado y antes de mostrar errores por espacios vacíos en el form
    if( !isFormValid ) return;
    dispatch( startRegisterUserWithEmailPassword( formState ) );
  }

  return (
    <AuthLayout title="Crear cuenta">

      <form onSubmit={onSubmit}>
          <Grid container>
           
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Nombre completo" 
                type="text" 
                placeholder='Nombre completo' 
                fullWidth
                name="displayName"
                value={ displayName }
                onChange={ onInputChange }
                error={ !!displayNameValid && formSubmited }
                helperText={ displayNameValid }
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Correo" 
                type="email" 
                placeholder='correo@google.com' 
                fullWidth
                name="email"
                value={ email }
                onChange={ onInputChange }
                error={ !!emailValid && formSubmited }
                helperText={ emailValid }
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder='Contraseña' 
                fullWidth
                name="password"
                value={ password }
                onChange={ onInputChange }
                error={ !!passwordValid && formSubmited }
                helperText={ passwordValid }
              />
            </Grid>
            
            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>

              <Grid 
                item 
                xs={ 12 }
                display={ !!errorMessage ? '' : 'none' }
                >
                <Alert severity='error'>{ errorMessage }</Alert>
              </Grid>

              <Grid item xs={ 12 }>
                <Button
                  disabled={ isCheckingAuthentication }
                  type="submit" 
                  variant='contained' 
                  fullWidth>
                  Crear cuenta
                </Button>
              </Grid>

            </Grid>


            <Grid container direction='row' justifyContent='end'>
              <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
              <Link component={ RouterLink } color='inherit' to="/auth/login">
                ingresar
              </Link>
            </Grid>

          </Grid>


        </form>

    </AuthLayout>
  )
}
