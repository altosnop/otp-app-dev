import React, { useEffect, useState } from 'react';
import Navbar from '../../components/NavBar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CodesTableRow from '../../components/CodesTableRow';
import axios from 'axios';
const _ = require('lodash');

const OtpInfo = () => {
  const [filesData, setFilesData] = useState(null);

  useEffect(() => getCodes(), []);

  async function getCodes() {
    await axios.get('/api/codes').then((res) => {
      setFilesData(res.data);
    });
  }

  const grouped = _.groupBy(
    filesData,
    (item) => `${item.description}+${item.fileName}+${item.expireAt}`
  );

  return (
    <>
      <Navbar name="Информация о паролях" />
      <TableContainer component={Paper} sx={{ marginTop: '50px' }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="left">Описание файла</TableCell>
              <TableCell align="left">Имя файла</TableCell>
              <TableCell align="left">Количество паролей</TableCell>
              <TableCell align="left">Дата окончания</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(grouped).map((elem, i) => (
              <CodesTableRow
                key={i}
                fileName={elem.split('+')[0]}
                description={elem.split('+')[1]}
                expireAt={elem.split('+')[2]}
                codesData={grouped[elem]}
                codesCount={grouped[elem].length}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {filesData === null && <h2>Загрузка...</h2>}
    </>
  );
};

export default OtpInfo;
