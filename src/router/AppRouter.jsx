import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Navigate, Route, Routes} from "react-router-dom";
import {FirebaseAuth} from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

import {AuthRoutes} from "../auth/routes/AuthRoutes";
import {JournalRoutes} from "../journal/routes/JournalRoutes";
import {CheckingAuth} from "../ui";
import {login, logout} from "../store/auth/index.js";

export const AppRouter = () => {

    const { status } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {

        onAuthStateChanged(FirebaseAuth, async(user) => {
            if (!user) return dispatch(logout());

            const { uid, email, displayName, photoURL } = user;

            return dispatch(login({ uid, email, displayName, photoURL }));
        });

    }, []);


    if (status === 'checking') {
        return <CheckingAuth />
    }

    return (
        <Routes>

            {
                status === 'authenticated'
                  ? <Route path="/*" element={<JournalRoutes />}/>
                  : <Route path="/auth/*" element={<AuthRoutes />}/>
            }

            <Route path="/" element={<Navigate to="/auth/login" />}/>

            {/* Login y registro */}
            {/*<Route path="/auth/*" element={<AuthRoutes />}/>*/}

            {/* JournalApp */}
            <Route />
            {/*<Route path="/*" element={<JournalRoutes />}/>*/}

        </Routes>
    )
}
