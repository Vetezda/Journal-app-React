import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography, Alert } from '@mui/material';
import { Google } from '@mui/icons-material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import {checkAuthentication, startGoogleSignIn, startLoginUserWithEmailPassword  } from '../../store/auth/thunks'
  

const formData = {//debe  ir afuera del componente ya que debido a la useEffect que detecta acmbios en el initialForm lo renderiza una y otra vez
      email: '',
      password: ''
    }

export const LoginPage = () => {

  const { status, errorMessage } = useSelector( state => state.auth );
                          //memorizamos el status para desabilitar los botones de inicio de sesion hasta que este el valor del status cambie
  const isAuthenticated = useMemo( () => status === 'checking', [status] );

  const dispatch = useDispatch();


  const { email, password, onInputChange } = useForm(formData);
  

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch( startLoginUserWithEmailPassword({ email, password }) );
  }

  const onGoogleSignIn = () => {
    console.log('onGoogle')
    dispatch( startGoogleSignIn() );
  }

  return (
    <AuthLayout title="Login">
      <form 
          onSubmit={onSubmit}
          className="animate__animated animate__fadeIn animate__faster"
          aria-label='submit-form'
          >
          <Grid container>
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Correo" 
                type="email"
                name="email"
                value={ email }
                onChange={ onInputChange }
                placeholder='correo@google.com' 
                fullWidth
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Contraseña" 
                type="password"
                name = "password" 
                value={ password }
                onChange={ onInputChange }
                placeholder='Contraseña' 
                fullWidth
                inputProps={
                  { 'data-testid': 'password' }
                }
              />
            </Grid>
            
            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
                <Grid 
                  display={ !!errorMessage ? '' : 'none' } 
                  item xs={ 12 } 
                  sm={ 12 }
                >
                   <Alert severity='error'>{ errorMessage }</Alert>
                </Grid>
                <Grid item xs={ 12 } sm={ 6 }>
                    <Button
                      disabled={ isAuthenticated }
                      type="submit" 
                      variant='contained' 
                      fullWidth>
                      Login
                    </Button>
                </Grid>
                <Grid item xs={ 12 } sm={ 6 }>
                    <Button
                      disabled={ isAuthenticated }
                      onClick={ onGoogleSignIn } 
                      variant='contained' 
                      fullWidth 
                      aria-label="google-btn-test">
                        <Google />
                      <Typography sx={{ ml: 1 }}>Google</Typography>
                    </Button>
                </Grid>
            </Grid>


            <Grid container direction='row' justifyContent='end'>
              <Link component={ RouterLink } color='inherit' to="/auth/register">
                Crear una cuenta
              </Link>
            </Grid>

          </Grid>

        </form>

    </AuthLayout>
  )
}
