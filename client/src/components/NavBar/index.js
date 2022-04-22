import React from 'react';
import AppBar from '@mui/material/AppBar';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Navbar = () => {
  const signOut = () => {
    auth.signOut();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        height: '50px',
        display: 'flex',
      }}
    >
      <Box
        sx={{
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          height: '100%',
          width: '50%',
        }}
      >
        <Link to="/admin" style={{ textDecoration: 'none' }}>
          <Button variant="text" sx={{ color: 'white' }}>
            Главная
          </Button>
        </Link>
        <Link to="/admin/upload-video" style={{ textDecoration: 'none' }}>
          <Button variant="text" sx={{ color: 'white' }}>
            Загрузить файл
          </Button>
        </Link>
        <Link to="/admin/create-otp" style={{ textDecoration: 'none' }}>
          <Button variant="text" sx={{ color: 'white' }}>
            Создать пароль
          </Button>
        </Link>
        <Link to="/admin/otp-info" style={{ textDecoration: 'none' }}>
          <Button variant="text" sx={{ color: 'white' }}>
            Пароли
          </Button>
        </Link>
        <Link to="/admin/files-info" style={{ textDecoration: 'none' }}>
          <Button variant="text" sx={{ color: 'white' }}>
            Файлы
          </Button>
        </Link>
        <Button variant="text" sx={{ color: 'black' }} onClick={signOut}>
          Выйти
        </Button>
      </Box>
    </AppBar>
  );
};

export default Navbar;
