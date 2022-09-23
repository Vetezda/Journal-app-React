import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { authSlice } from "../../../src/store/auth/authSlice";
import { startGoogleSignIn } from "../../../src/store/auth/thunks";
import { notAuthenticatedState } from "../../fixtures/authFixtures";

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginUserWithEmailPassword = jest.fn();

jest.mock( '../../../src/store/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startLoginUserWithEmailPassword: ({email, password}) => {
        return () => mockStartLoginUserWithEmailPassword({email, password});
    }

}));

jest.mock('react-redux', () => ({ 
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) => fn(),
}));

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState: {
        auth: notAuthenticatedState
    }
});


describe('Pruebas en <LoginPage />', () => { 

    beforeEach( () => jest.clearAllMocks() );
    
    test('El componente debe mostrarse correctamente', () => {
        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        expect( screen.getAllByText('Login').length ).toBeGreaterThanOrEqual(1);

    });

    test('El boton de google debe llmar el startGoogleSignIn', () => {
        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const googleBtn = screen.getByLabelText('google-btn-test');
        fireEvent.click(googleBtn);

        expect(  mockStartGoogleSignIn ).toHaveBeenCalled();

    });

    test('El submit', () => {

        const email = 'josephbustoslopez@gmail.com';
        const password = '123456';

        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const emailField = screen.getByRole('textbox', { name: 'Correo' });
        fireEvent.change( emailField, { target: { name: 'email', value: email } } );

        const passwordField = screen.getByTestId('password');
        fireEvent.change( passwordField, { target: { name: 'password', value: password } } );
        
        const loginForm = screen.getByLabelText('submit-form');
        fireEvent.submit( loginForm );


        expect(  mockStartLoginUserWithEmailPassword ).toHaveBeenCalledWith({
            email: email,
            password: password
        });

    });

 })