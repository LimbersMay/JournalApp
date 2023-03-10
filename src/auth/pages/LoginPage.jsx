import {useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link as RouterLink} from 'react-router-dom';

import {Alert, Button, Grid, Link, TextField, Typography} from "@mui/material";
import {Google} from "@mui/icons-material";

import {startGoogleSignIn, startLoginUserLocally} from "../../store/auth";
import {AuthLayout} from "../layout/AuthLayout";
import {useForm} from "../../hooks";

const formData = {
    email: '',
    password: ''
}

export const LoginPage = () => {

    const { status, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const { email, password, onInputChange } = useForm(formData);

    const isAuthenticating = useMemo(() => status === 'checking', [status]);
    const [ formSubmitted, setFormSubmitted ] = useState(false);

    const onSubmit = (event) => {
        event.preventDefault();
        //! No es la acción a despachar
        setFormSubmitted(true);
        dispatch(startLoginUserLocally({email, password}));
    }

    const onGoogleSignIn = () => {
        dispatch(startGoogleSignIn());
    }

    return (
        <AuthLayout title='Login'>
            <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster" aria-label="submit-form">
                <Grid container>

                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField
                            label="Email"
                            type="email"
                            placeholder="email@google.com"
                            fullWidth
                            name="email"
                            value={email}
                            onChange={onInputChange}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField
                            label="Password"
                            type="password"
                            placeholder="password"
                            fullWidth
                            inputProps={{
                                'data-testid': 'password'
                            }}
                            name="password"
                            value={password}
                            onChange={onInputChange}
                        />
                    </Grid>

                    <Grid container spacing={2} sx={{mb: 2, mt: 1}}>

                        <Grid
                            item
                            xs={12}
                            display={ !!errorMessage && formSubmitted ? '' : 'none' }
                        >
                            <Alert severity='error'>{ errorMessage }</Alert>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Button
                                type='submit'
                                variant='contained'
                                fullWidth
                                disabled={ isAuthenticating }
                            >
                                Login
                            </Button>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Button
                                variant='contained'
                                fullWidth
                                aria-label='google-btn'
                                onClick={onGoogleSignIn}
                                disabled={ isAuthenticating }
                            >
                                <Google/>
                                <Typography sx={{ml: 1}}>Google</Typography>
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container direction='row' justifyContent='end'>
                        <Link component={RouterLink} color='inherit' to="/auth/register">
                            Signup
                        </Link>
                    </Grid>

                </Grid>
            </form>

        </AuthLayout>
    )
}
