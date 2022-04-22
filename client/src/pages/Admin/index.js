import React from 'react';
import Navbar from '../../components/NavBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getAuth } from 'firebase/auth';
import useStyles from './styles';

const Admin = () => {
  const classes = useStyles();

  const auth = getAuth();
  const user = auth.currentUser;

  return (
    <>
      <Navbar name="Панель администартора/" />
      <Box className={classes.adminBox}>
        <Typography
          variant="h4"
          component="div"
          align="center"
          sx={{ marginBottom: '100px' }}
        >
          Добро пожаловать на страницу администартора. Что бы перемещаться,
          используйте меню сверху.
        </Typography>
        <Typography
          variant="h4"
          component="div"
          color="secondary"
          sx={{ fontWeight: '600' }}
        >
          {user.email}
        </Typography>
      </Box>
    </>
  );
};

export default Admin;
