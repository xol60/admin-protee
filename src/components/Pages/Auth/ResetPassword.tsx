import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import background from '../../../assests/background.jpg'
import api from '../../../api/setUpApi'
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
const theme = createTheme();

export default function ResetPassword() {
    const params = useParams();
    const secretKey = params.secretKey + '';
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (data.get('password') !== data.get('cpassword')) {
            toast.error("Passwords must be same", {
                position: toast.POSITION.TOP_CENTER
            });
        }
        else {
            const pass = data.get('password') + ''
            if (pass.length < 8) {
                toast.error('Password must have at least 8 characters', {
                    position: toast.POSITION.TOP_CENTER
                });
            }
            else {
                console.log({
                    secretKey: secretKey,
                    newPassword: pass
                })
                const res = api.auth.resetPassword({
                    secretKey: secretKey,
                    newPassword: pass
                })
                Promise.all([res]).then(values => {
                    console.log(values[0]);
                    if (values[0]) {
                        toast.success('Your password has been changed successfully', {
                            position: toast.POSITION.TOP_CENTER,
                            theme: "colored"
                        });
                    }
                }
                ).catch(error => {
                    if (error.response.status === 400) {
                        toast.error("Request is invalid or out of date", {
                            position: toast.POSITION.TOP_CENTER,
                            theme: "colored"
                        });
                    }
                })
            }
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${background})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'red' }}>
                            <RotateLeftIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Reset Password
                        </Typography>

                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="New Password"
                                type="password"
                                id="password"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="cpassword"
                                label="Confirm Password"
                                type="password"
                                id="cpassword"
                            />
                            <Button
                                type="submit"
                                fullWidth

                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Reset Password
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link to="/auth/login" >
                                        Sign in
                                    </Link>
                                </Grid>

                            </Grid>

                        </Box>

                    </Box>

                </Grid>
            </Grid>
        </ThemeProvider>
    );
}