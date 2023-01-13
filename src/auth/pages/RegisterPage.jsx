import {useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {Alert, Button, Grid, Link, TextField, Typography} from "@mui/material";
import {AuthLayout} from "../layout/AuthLayout";
import {Link as RouterLink} from "react-router-dom";
import {useForm} from "../../hooks";
import {startCreatingUserLocally} from "../../store/auth";

const formData = {
    displayName: '',
    email: '',
    password: ''
}

const formValidations = {
    email: [(value) => value.includes('@'), 'The email must contain an @.'],
    password: [(value) => value.length >= 6, 'The password lenght must be at least 6.'],
    displayName: [(value) => value.length >= 1, 'The name is required.']
}

export const RegisterPage = () => {

    const dispatch = useDispatch();
    const [ formSubmitted, setFormSubmitted ] = useState(false);

    const { status, errorMessage } = useSelector(state => state.auth);
    const isCheckingAuthentication = useMemo(() => status === 'checking');

    const {
        formState, displayName, email, password, onInputChange,
        isFormValid, displayNameValid, emailValid, passwordValid
    } = useForm(formData, formValidations);

    const onSubmit = (event) => {
        event.preventDefault();
        setFormSubmitted(true);

        if (!isFormValid) return;
        dispatch(startCreatingUserLocally(formState))
    }

    return (
        <AuthLayout title='Register'>

            <h1>Form valid: {isFormValid ? 'Valid' : 'Invalid'}</h1>

            <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
                <Grid container >

                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField
                            label="Name"
                            type="text"
                            placeholder="Your name"
                            fullWidth
                            name="displayName"
                            onChange={onInputChange}
                            error={!!displayNameValid && formSubmitted}
                            helperText={displayNameValid}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField
                            label="Email"
                            type="email"
                            placeholder="email@google.com"
                            fullWidth
                            name="email"
                            onChange={onInputChange}
                            error={!!emailValid && formSubmitted}
                            helperText={emailValid}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField
                            label="Password"
                            type="password"
                            placeholder="password"
                            fullWidth
                            name="password"
                            onChange={onInputChange}
                            error={!!passwordValid && formSubmitted}
                            helperText={passwordValid}
                        />
                    </Grid>

                    <Grid
                        container
                        display={!!errorMessage && formSubmitted ? '' : 'none'}
                    >
                        <Grid
                            item
                            xs={12}
                        >
                            <Alert severity='error'>{ errorMessage }</Alert>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} sx={{ mb:2, mt: 1 }}>
                        <Grid item xs={12} >
                            <Button
                                variant='contained'
                                fullWidth
                                type="submit"
                                disabled={isCheckingAuthentication}
                            >
                                Signup
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container direction='row' justifyContent='end'>
                        <Typography sx={{mr: 1}}>Do you already have an account?</Typography>
                        <Link component={ RouterLink } color='inherit' to="/auth/login">
                            Login
                        </Link>
                    </Grid>

                </Grid>
            </form>
        </AuthLayout>
    )
}
