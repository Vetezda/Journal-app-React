import { loginWithEmailPassword, logoutFirebase, signInWithGoogle } from '../../../src/firebase/providers';
import { checkingCredentials, login, logout } from '../../../src/store/auth/authSlice';
import {checkAuthentication, startGoogleSignIn, startLoginUserWithEmailPassword, startLogout} from '../../../src/store/auth/thunks';
import { clearNotesLogout } from '../../../src/store/journal/journalSlice';
import { demoUser } from '../../fixtures/authFixtures';

jest.mock('../../../src/firebase/providers');//todas las exportaciones que contenga este archivo, como sus funciones, etc, seran mocks en estos test


describe('Pruebas en Auth - Thunks', () => { 

    const dispatch = jest.fn();

    beforeEach( () => jest.clearAllMocks() );
    
    test('Debe invocar el checkingCredentials', async() => { 

        await checkAuthentication()(dispatch);
        //checkingCredentials() = {type: 'auth/checkingCredentials'}
        expect(dispatch).toHaveBeenCalledWith( checkingCredentials() );

     })

    test('startGoogleSignIn debe llamar chekingCredentials y login con Exito', async() => { 

        const loginData = { ok: true, ...demoUser };
        await signInWithGoogle.mockResolvedValue( loginData );

        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith( checkingCredentials() );
        expect(dispatch).toHaveBeenCalledWith( login(loginData)  );

     })

    test('startGoogleSignIn debe llamar chekingCredentials y logout con Error', async() => { 

        const loginData = { ok: false, errorMessage: 'Un error en Google' };
        await signInWithGoogle.mockResolvedValue( loginData );

        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith( checkingCredentials() );
        expect(dispatch).toHaveBeenCalledWith( logout(loginData.errorMessage)  );

     })

    test('startLoginUserWithEmailPassword debe llamar chekingCredentials y login con Exito', async() => { 

        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: '123456' };

        await loginWithEmailPassword.mockResolvedValue( loginData );

        await startLoginUserWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith( checkingCredentials() );
        expect(dispatch).toHaveBeenCalledWith( login(loginData)  );

     })


    test('startLogout debe llamar logoutFirebase clearNotesLogout y logout', async() => { 

        await startLogout()(dispatch);

        expect(logoutFirebase).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith( clearNotesLogout() );
        expect(dispatch).toHaveBeenCalledWith( logout()  );

     })

 })