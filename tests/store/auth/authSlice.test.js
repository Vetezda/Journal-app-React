import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixtures";
//const { login, logout, checkingCredentials } = authSlice.actions;


describe('Pruebas en authSlice', () => { 

    test('Debe regresar el estado inicial y llamarse "auth"', () => { 
        
        const state = authSlice.reducer( initialState, {} );
        expect( state ).toEqual( initialState );
        expect( authSlice.name ).toBe( 'auth' );

    });

    test('Debe reaLizar la autenticación', () => { 
        
        const state = authSlice.reducer( initialState, login( demoUser ) );
        expect( state ).toEqual( {
            status: 'authenticated',
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null,
        } );

    });

    test('Debe realizar el logout sin argumentos', () => { 
        
        const state = authSlice.reducer( authenticatedState, logout() );
        expect( state ).toEqual( {
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined,
        } ); 

    });

    test('Debe realizar el logout y mostrar mensaje de error', () => { 

        const errorMessage = 'Credential is not valid';

        const state = authSlice.reducer( authenticatedState, logout({ errorMessage }) );
        expect( state ).toEqual( {
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: 'Credential is not valid',
        } ); 

    });

    test('Debe cambiar el estado a checking', () => { 

        const errorMessage = 'Credential is not valid';

        const state = authSlice.reducer( authenticatedState, checkingCredentials() );
        expect( state.status ).toBe('checking'); 

    });
 
});
