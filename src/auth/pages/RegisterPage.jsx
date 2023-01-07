import {AuthLayout} from "../layout/AuthLayout.jsx";
import {Button, Grid, Link, TextField, Typography} from "@mui/material";
import {Google} from "@mui/icons-material";
import {Link as RouterLink} from "react-router-dom";

export const RegisterPage = () => {
    return (
        <AuthLayout title='Register'>
            <form>
                <Grid container >

                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField
                            label="Name"
                            type="text"
                            placeholder="Your name"
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField
                            label="Email"
                            type="email"
                            placeholder="email@google.com"
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField
                            label="Password"
                            type="password"
                            placeholder="password"
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField
                            label="Password"
                            type="password"
                            placeholder="password"
                            fullWidth
                        />
                    </Grid>

                    <Grid container spacing={2} sx={{ mb:2, mt: 1 }}>
                        <Grid item xs={12} >
                            <Button variant='contained' fullWidth>
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
