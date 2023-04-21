import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/router';
import Alert from '@mui/material/Alert';
import Cookies from 'universal-cookie'


const theme = createTheme();

export default function Login() {

  const router = useRouter();
  const cookies = new Cookies();
  const [error, setError] = React.useState(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password')
    });
    await fetch('http://localhost:3001/api/v1/auth/system-user/login', {

      method: 'POST',
      headers: { 'Content-Type': 'application/json' },

      body: JSON.stringify({
        email: data.get('email'),
        password: data.get('password')
      })

    }).then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.accessToken) {
          setError(false)
          router.push('/')
          cookies.set('jwt_authentication', data.accessToken)
        }
        else {
          setError(true)
        }
      })

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
            backgroundImage: 'url(/background2.jpg)',
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
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {error ?
                (
                  <>
                    {

                      <Alert severity="warning">The email address or password is incorrect. Please retry</Alert>
                    }</>
                ) : null
              }
              <Button
                fullWidth
                variant="outlined"
                type="submit"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/forgotpassword" variant="body2">
                    Forgot password?
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