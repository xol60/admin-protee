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
import CoffeeIcon from '@mui/icons-material/Coffee';
import background from '../../../assests/background.jpg'
import { Alert, AlertColor } from '@mui/material';
import api from '../../../api/axiosClient'


const theme = createTheme();

export default function ForgotPassword() {
  const [alert, setAlert] = React.useState(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
    });
    const res = api.auth.requestResetPassword({
      email: data.get('email') + ''
    })
    Promise.all([res]).then(values => {
      console.log(values[0]);
      if (values[0]) {
        setAlert(true);
      }
    }
    )
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
            {alert ?
              (
                <>
                  {

                    <Alert severity={'success'}>{'Reset password successfully. Please check your email'}</Alert>
                  }</>
              ) : null
            }

          </Box>

        </Grid>
      </Grid>
    </ThemeProvider>
  );
}