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
import CoffeeIcon from '@mui/icons-material/Coffee';

import { Alert, AlertColor } from '@mui/material';



const theme = createTheme();

export default function ForgotPassword() {
  const [alert, setAlert] = React.useState<AlertColor>('error');

  const [message, setMessage] = React.useState('')
  const [error, setError] = React.useState(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),

    });

    if (data.get('email') == "protee@gmail.com") {
      setAlert('success')
      setMessage('Reset password successfully.Please check your email')
    }
    else {
      setAlert('error')
      setMessage('The email address is incorrect.Please retry')
    }
    setError(true)
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
            backgroundImage: 'url(/background.jpg)',
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
              <CoffeeIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Forgot Password
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



              <Button
                type="submit"
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
              >
                Reset Password
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/" variant="body2">
                    Sign in
                  </Link>
                </Grid>

              </Grid>

            </Box>
            {error ?
              (
                <>
                  {

                    <Alert severity={alert}>{message}</Alert>
                  }</>
              ) : null
            }

          </Box>

        </Grid>
      </Grid>
    </ThemeProvider>
  );
}