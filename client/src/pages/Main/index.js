import React, { useState } from 'react';
import axios from 'axios';
import PinInput from 'react-pin-input';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';

import { setFileName } from '../../store/file/fileActions';
import { setFile } from '../../store/file/fileActions';

import { fileInfoSelector } from '../../store/file/fileSelectors';
import { fileNameSelector } from '../../store/file/fileSelectors';

import useStyles from './styles';

const Main = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [message, setMessage] = useState(null);
  const [valid, setValid] = useState(null);
  const [otp, setOtp] = useState('');

  const name = useSelector(fileNameSelector);
  const fileInfo = useSelector(fileInfoSelector);

  const verifyOtpHandler = async (event) => {
    event.preventDefault();

    await axios
      .post('/api/otp-verify', {
        code: otp,
      })
      .then((response) => {
        dispatch(setFile(response.data));
        dispatch(setFileName(response.data.fileName));
        setMessage(response.data.message);
        setValid(response.data.valid);
      })
      .catch((error) => {
        setMessage('Перевірте правильність введення пароля');
      });
  };

  const handleDownload = () => {
    window.location.href = `http://helpme.pp.ua/api/files/download/${name}`;
    localStorage.clear();
    activateCode(fileInfo.code);
  };

  async function activateCode(code) {
    await axios.post('/api/otp-activate', { code: code }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <AppBar className={classes.appBar}>
        <Typography
          variant="h6"
          component="div"
          sx={{ color: 'white', fontSize: '30px' }}
        >
          Завантажити файл за паролем!
        </Typography>
      </AppBar>
      <Box className={classes.container}>
        <Box
          sx={{
            marginTop: '7%',
            marginLeft: '3%',
          }}
        >
          <Typography variant="h5" component="div">
            1) Пароль дає вам право на одне скачування файлу
          </Typography>
          <Typography variant="h5" component="div">
            2) Введіть виданний вам пароль та натисність кнопку{' '}
            <span style={{ color: 'red' }}>"Перевірка пароля"</span>
          </Typography>
          <Typography variant="h5" component="div">
            3) Після, натисніть кнопку{' '}
            <span style={{ color: 'red' }}>"Завантажити файл"</span> -{' '}
            <b>обов'язково дочекайтеся повного завантаження файлу</b>
          </Typography>
          <Typography variant="h5" component="div">
            4) Після завантаження файлу, щоб дізнатись куди завантажився файл,
            натисніть комбінацію клавіш <b>Ctrl + J</b>
          </Typography>
          <Typography variant="h5" component="div">
            5) Завантажувати файл потрібно тільки на комп'ютер!
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box
            component="form"
            onSubmit={verifyOtpHandler}
            className={classes.inputContainer}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{ marginBottom: '15px' }}
            >
              Введіть виданий вам пароль
            </Typography>
            <PinInput
              focus={true}
              length={7}
              type="numeric"
              inputMode="number"
              style={{
                marginBottom: '20px',
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
              }}
              inputStyle={{
                borderColor: 'grey',
                fontSize: '20px',
                borderRadius: '7px',
              }}
              inputFocusStyle={{ borderColor: '#FFB74D' }}
              onComplete={(value) => {
                setOtp(value);
              }}
            />
            {otp !== '' ? (
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                fullWidth
                size="large"
                sx={{
                  color: 'white',
                  marginBottom: '3%',
                }}
              >
                Перевірка пароля
              </Button>
            ) : (
              <Button
                variant="contained"
                disabled
                type="submit"
                fullWidth
                size="large"
                sx={{
                  color: 'white',
                  marginBottom: '3%',
                }}
              >
                Перевірка пароля
              </Button>
            )}
            {name && valid === true ? (
              <Button
                onClick={handleDownload}
                color="primary"
                variant="contained"
                size="large"
                sx={{ color: 'white', marginBottom: '1%' }}
              >
                Завантажити файл
              </Button>
            ) : (
              <Button
                disabled
                color="primary"
                variant="contained"
                size="large"
                sx={{ color: 'white', marginBottom: '1%' }}
              >
                Завантажити файл
              </Button>
            )}
          </Box>
          {message && (
            <Alert
              severity="error"
              variant="filled"
              sx={{
                fontSize: '23px',
              }}
              className={classes.alert}
            >
              {message}
            </Alert>
          )}
          {valid === true && (
            <Box className={classes.descripBox}>
              <Paper elevation={1} className={classes.descripPaper}>
                <Typography
                  variant="h5"
                  gutterBottom
                  component="div"
                  sx={{ fontWeight: '500' }}
                >
                  Опис файлу
                </Typography>
                <Typography
                  variant="h5"
                  gutterBottom
                  component="div"
                  sx={{
                    textAlign: 'center',
                    fontWeight: '500',
                  }}
                  color="secondary"
                >
                  {fileInfo.description}
                </Typography>
              </Paper>
            </Box>
          )}
        </Box>
        <Box className={classes.infoLineBox}>
          <Typography
            sx={{
              color: 'white',
              width: '90%',
            }}
            variant="h5"
            component="div"
            align="center"
          >
            Передавати іншим особам завантажений файл заборонено або лише з
            дозволу правовласника (дотримуючись авторських прав).
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Main;
