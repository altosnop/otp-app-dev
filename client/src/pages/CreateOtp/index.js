import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Navbar from '../../components/NavBar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import useInput from '../../hooks/useInput';
import axios from 'axios';

import useStyles from './styles';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CreateOtp = () => {
  const classes = useStyles();

  const [otp, setOtp] = useState(null);
  const [message, setMessage] = useState(null);
  const [open, setOpen] = useState(false);
  const [passCount, setPassCount] = useState(0);

  const fileName = useInput('');
  const description = useInput('');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const createOtpHandler = async (event) => {
    event.preventDefault();

    await axios
      .post('/api/otp-generate', {
        fileName: fileName.value,
        description: description.value,
      })
      .then((response) => {
        setOtp(response.data.code);
        setMessage(response.data.message);
        setOpen(true);
        setPassCount(passCount + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Navbar name="Создание пароля" />
      <Box className={classes.otpContainer}>
        <Box
          component="form"
          onSubmit={createOtpHandler}
          className={classes.otpForm}
        >
          <TextField
            label="Название файла"
            variant="outlined"
            autoFocus
            sx={{ marginBottom: '5%' }}
            required
            {...fileName}
          />
          <TextField
            label="Описание файла"
            variant="outlined"
            sx={{ marginBottom: '5%' }}
            required
            {...description}
          />
          <Button
            color="primary"
            variant="contained"
            type="submit"
            sx={{ color: 'white' }}
          >
            Создать пароль
          </Button>
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            sx={{ marginTop: '5%' }}
          >
            Количество созданных паролей: {passCount}
          </Typography>
        </Box>
        <Box>
          {otp !== null ? (
            <Typography
              variant="h4"
              gutterBottom
              component="div"
              color="secondary"
            >
              {otp}
            </Typography>
          ) : (
            <Typography variant="h4" gutterBottom component="div">
              пароль
            </Typography>
          )}
        </Box>
        {message !== null && (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: '100%' }}
            >
              {message}
            </Alert>
          </Snackbar>
        )}
      </Box>
      <Typography variant="h5" gutterBottom component="div" align="center">
        *Вводите - название-файла.mp4/jpg/png*
      </Typography>
    </>
  );
};

export default CreateOtp;
