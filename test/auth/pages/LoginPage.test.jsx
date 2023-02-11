import {fireEvent, render, screen} from "@testing-library/react";
import {LoginPage} from "../../../src/auth/pages";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import {authSlice} from "../../../src/store/auth";
import {MemoryRouter} from "react-router-dom";
import {notAuthenticatedState} from "../../fixtures/authFixtures";

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginUserLocally = jest.fn();

jest.mock('../../../src/store/auth/trunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startLoginUserLocally: ({ email, password }) => {
        return () => mockStartLoginUserLocally({email, password});
    }
}));

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) => fn()
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

    beforeEach(() => jest.clearAllMocks());

    test('debe de mostrar el componente correctamente', () => {

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
    });

    test('botón de google debe de llamar el startGoogleSignIn', () => {

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const googleBtn = screen.getByLabelText('google-btn');
        fireEvent.click(googleBtn);

        expect(mockStartGoogleSignIn).toHaveBeenCalled()
    });

    test('submit debe de llamar startLoginUserLocally', () => {

        const email = 'limber@google.com';
        const password = '123456';

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const emailField = screen.getByRole('textbox', {name: 'Email'});
        fireEvent.change(emailField, { target: {name: 'email', value: email }});

        const passwordField = screen.getByTestId('password');
        fireEvent.change(passwordField, {target: {name: 'password', value: password}});

        const loginForm = screen.getByLabelText('submit-form');
        fireEvent.submit(loginForm);

        expect(mockStartLoginUserLocally).toHaveBeenCalledWith({
            email,
            password
        });
    });
});
