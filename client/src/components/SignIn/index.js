import React from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import useStyles from './styles';
import useInput from '../../hooks/useInput';
const createHistory = require('history').createBrowserHistory;

const SignIn = () => {
  const classes = useStyles();
  const email = useInput('');
  const password = useInput('');
  const history = createHistory({ forceRefresh: true });

  const signIn = async (event) => {
    event.preventDefault();

    const user = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    console.log(user);
    history.push('/admin');
    try {
    } catch (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
    }
  };

  return (
    <Box component="div" className={classes.signin_wrapper}>
      <Box component="form" className={classes.signin_form} onSubmit={signIn}>
        <TextField
          className={classes.signin_field}
          sx={{
            margin: '10px',
          }}
          {...email}
          required
          fullWidth
          id="email"
          label="E-mail"
          name="email"
          autoComplete="email"
          autoFocus
          variant="outlined"
        />
        <TextField
          className={classes.signin_field}
          sx={{
            margin: '10px',
          }}
          {...password}
          required
          fullWidth
          name="password"
          label="Пароль"
          type="password"
          id="password"
          autoComplete="current-password"
          variant="outlined"
        />
        <Button
          className={classes.signin_button}
          sx={{
            margin: '10px',
            color: 'white',
          }}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Войти
        </Button>
      </Box>
    </Box>
  );
};

export default SignIn;
