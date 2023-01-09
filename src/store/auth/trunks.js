import {checkingCredentials, login, logout} from "./";
import {signInLocal, signInWithGoogle} from "../../firebase/providers.js";

export const checkingAuthentication = (email, password) => {
    return async(dispatch) => {
        // Cambiamos el estado a revisando las credenciales del usuario
        dispatch(checkingCredentials());
    }
}

export const startGoogleSignIn = () => {
    return async(dispatch) => {
        dispatch(checkingCredentials());

        const result = await signInWithGoogle();

        if (!result.ok) return dispatch(logout( result.errorMessage ));

        return dispatch(login(result));
    }
}

export const startCreatingUserUserLocally = ({ displayName, email, password }) => {
    return async(dispatch) => {
        dispatch(checkingCredentials());

        const { ok, uid, photoURL, errorMessage } = await signInLocal({ displayName, email, password });

        if (!ok) return dispatch(logout({ errorMessage }));

        dispatch(login({uid, displayName, email, photoURL}));
    }
}
