import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { updateToggleSignup, signin, resetPasswordRequest } from '../slices/user.slice'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Loading from './Loading';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                iCare
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function Signin() {

    let [open, setOpen] = useState(false)
    let [email, setEmail] = useState('')
    let { userLoading } = useSelector(state => state.userSlice)
    let dispatch = useDispatch()


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let user = {
            email: data.get('email'),
            password: data.get('password'),
        }
        dispatch(signin(user))
    };

    return (
        <div className="Middleware">
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs" sx={{ backgroundColor: 'white' }}>
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <img src="/images/logo.png" alt="" className="logo" />
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={0} justifyContent="flex-start">
                                <Grid item>
                                    <button onClick={() => setOpen(true)} className="toggle-signup">Forgotten password?</button>
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, backgroundColor: 'rgb(252, 119, 83)' }}
                            >
                                {userLoading ? <Loading /> : 'Sign In'}
                            </Button>
                            <Grid container justifyContent="center">
                                <Grid item>
                                    <button onClick={() => dispatch(updateToggleSignup(true))} className="toggle-signup">Don't have any account? Signup</button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 2, mb: 2 }} />
                </Container>
            </ThemeProvider>

            {open && <div className="booking-popup">
                <div className="innerPopup">
                    <div className="inputDiv">
                        <label>Enter you email: </label>
                        <input className="input-text" type="text" onChange={(e) => { setEmail(e.target.value); }} />
                    </div>
                    <button onClick={() => { dispatch(resetPasswordRequest({email})); setOpen(false) }} className="booking2">Submit</button>
                    <button className="kick1" onClick={() => { setOpen(false); }}>X</button>
                </div>
            </div>}
        </div>
    );
}