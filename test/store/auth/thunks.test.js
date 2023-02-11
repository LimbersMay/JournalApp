import {
    checkingAuthentication,
    startCreatingUserLocally,
    startGoogleSignIn,
    startLoginUserLocally, startLogout
} from "../../../src/store/auth/trunks";
import {loginLocal, logoutFirebase, signInLocal, signInWithGoogle} from "../../../src/firebase/providers";
import {checkingCredentials, login, logout} from "../../../src/store/auth";
import {demoUser} from "../../fixtures/authFixtures";
import {clearNotesLogout} from "../../../src/store/journal";

jest.mock("../../../src/firebase/providers");

describe('Pruebas en AuthThunk', () => {

    const dispatch = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    test('debe de invocar el checkingCredentials', async () => {
        await checkingAuthentication()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    });

    test('startGoogleSignIn debe de llamar checkingCredentials y login', async () => {

        const loginData = {ok: true, ...demoUser};
        await signInWithGoogle.mockResolvedValue(loginData);

        // thunk
        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));
    });

    test('startGoogleSignIn debe de llamar checkingCredentials y login - Error', async () => {

        const loginData = {ok: false, errorMessage: 'Un error en Google'};
        await signInWithGoogle.mockResolvedValue(loginData);

        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));

    });

    test('startCreatingUserLocally debe de llamar checkingCredentials y login con el user', async () => {

        const loginData = {ok: true, ...demoUser};
        const signInData = {
            displayName: loginData.displayName,
            email: loginData.email,
            password: '1234'
        }
        await signInLocal.mockResolvedValue(loginData);

        await startCreatingUserLocally(signInData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login({ ...demoUser }));
    });

    test('startCreatingUserLocally debe de llamar checkingCredentials y login con el user - error', async () => {

        const loginData = {ok: false, errorMessage: 'Cannot signIn user'};
        const signInData = {
            displayName: loginData.displayName,
            email: loginData.email,
            password: '1234'
        }
        await signInLocal.mockResolvedValue(loginData);

        await startCreatingUserLocally(signInData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout({ errorMessage: loginData.errorMessage}));
    });

    test('startLoginWithEmailAndPassword debe de llamar checkingCredentials y login', async () => {
        const loginData = { ok: true, ...demoUser };

        const formData = {
            email: demoUser.email,
            password: '123456'
        }

        await loginLocal.mockResolvedValue(loginData);
        await startLoginUserLocally(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login({ ...demoUser }));
    });

    test('startLoginWithEmailAndPassword debe de llamar checkingCredentials y login - error', async () => {
        const loginData = { ok: false, errorMessage: 'Error when loging out' };

        const formData = {
            email: demoUser.email,
            password: '123456'
        }

        await loginLocal.mockResolvedValue(loginData);
        await startLoginUserLocally(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout({ errorMessage: loginData.errorMessage}));
    });

    test('startLogout debe de llamar logoutFirebase, clearNotes y logout', async () => {

        await startLogout()(dispatch);

        expect(logoutFirebase).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
        expect(dispatch).toHaveBeenCalledWith(logout());
    });
});
