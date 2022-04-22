import React, { useState } from 'react';
import Navbar from '../../components/NavBar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LinearProgress from '@mui/material/LinearProgress';
import MuiAlert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/styles';
import useStyles from './styles';
import axios from 'axios';
import { Typography } from '@mui/material';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Input = styled('input')({
  display: 'none',
});

const UploadVideo = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [progress, setProgress] = useState(0);

  const classes = useStyles();

  const getFile = (event) => {
    setFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };

  const uploadFile = async (event) => {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('fileName', fileName);

    await axios.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        setProgress(
          parseInt(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          )
        );
      },
    });
  };

  return (
    <>
      <Navbar name="Загрузка видео" />
      <>
        <Box
          className={classes.upload_wrapper}
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {file != null && (
            <TextField
              id="outlined-basic"
              variant="outlined"
              defaultValue={file.name}
              sx={{ width: '20%', marginBottom: '20px' }}
              InputProps={{
                readOnly: true,
              }}
            />
          )}
          <Box sx={{ marginBottom: '20px' }}>
            <label htmlFor="contained-button-file">
              <Input
                accept="video/*, image/*, audio/*, .pdf, .exe, .doc, .docx"
                id="contained-button-file"
                type="file"
                onChange={getFile}
              />
              <Button
                variant="contained"
                component="span"
                color="secondary"
                size="large"
                sx={{
                  marginRight: '20px',
                  color: 'white',
                }}
              >
                Выбрать файл
              </Button>
            </label>
            {file === null ? (
              <Button
                variant="contained"
                component="span"
                startIcon={<CloudUploadIcon />}
                size="large"
                disabled
              >
                Загрузить
              </Button>
            ) : (
              <Button
                variant="contained"
                component="span"
                color="primary"
                startIcon={<CloudUploadIcon />}
                size="large"
                sx={{
                  color: 'white',
                }}
                onClick={uploadFile}
              >
                Загрузить
              </Button>
            )}
            <Box className={classes.barBox}>
              <LinearProgress
                className={classes.progressBar}
                variant="determinate"
                sx={{ height: '15px' }}
                value={progress}
              />
              <Typography variant="h6" component="div">
                {progress}%
              </Typography>
            </Box>
          </Box>
        </Box>
        {progress === 100 && (
          <Alert
            severity="success"
            sx={{ width: '25%', margin: '0 auto' }}
            variant="filled"
          >
            Файл загружен
          </Alert>
        )}
      </>
    </>
  );
};

export default UploadVideo;
