import React, { useState, useEffect } from 'react';
import Navbar from '../../components/NavBar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const FilesInfo = () => {
  const [files, setFiles] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [reload, setReload] = useState(false);
  const [message, setMessage] = useState(null);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  useEffect(() => getFiles(), []);

  async function getFiles() {
    await axios
      .get('/api/files')
      .then((response) => {
        setFiles(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const deleteFile = async (fileName) => {
    await axios
      .delete(`/api/files/delete/${fileName}`)
      .then((response) => {
        setOpenAlert(true);
        setMessage('Файл успешно удален');
        setReload(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (reload) {
      document.location.reload();
    }
  }, [reload]);

  return (
    <>
      <Navbar name="Информация о паролях" />
      <TableContainer component={Paper} sx={{ marginTop: '50px' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Имя файла</TableCell>
              <TableCell align="left"></TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files.map((elem, row_id) => (
              <TableRow key={row_id}>
                <TableCell key={elem.id} align="center">
                  {elem.name}
                </TableCell>
                <TableCell align="left">
                  <IconButton onClick={() => deleteFile(elem.name)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {message && (
        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: '100%' }}
          >
            {message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default FilesInfo;
