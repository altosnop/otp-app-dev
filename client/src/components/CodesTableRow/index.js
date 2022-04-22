import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CodesTableRow = (props) => {
  const { description, fileName, codesData, expireAt, codesCount } = props;

  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState(null);
  const [reload, setReload] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const deleteOtp = async (code) => {
    await axios
      .delete(`/api/otp-delete/${code}`)
      .then((response) => {
        setOpenAlert(true);
        setMessage("Пароль успешно удален");
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
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            align="left"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="left">
          {fileName}
        </TableCell>
        <TableCell component="th" scope="row" align="left">
          {description}
        </TableCell>
        <TableCell align="left">{codesCount}</TableCell>
        <TableCell align="left">{expireAt}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>№</TableCell>
                    <TableCell>Пароль</TableCell>
                    <TableCell>Активирован</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {codesData.map((elem, i) => (
                    <TableRow key={i}>
                      {elem.isActivated === true ? (
                        <TableCell
                          align="left"
                          sx={{ color: "red", fontWeight: "600" }}
                        >
                          {i + 1}
                        </TableCell>
                      ) : (
                        <TableCell align="left">{i + 1}</TableCell>
                      )}
                      {elem.isActivated === true ? (
                        <TableCell
                          align="left"
                          sx={{ color: "red", fontWeight: "600" }}
                        >
                          {elem.code}
                        </TableCell>
                      ) : (
                        <TableCell align="left">{elem.code}</TableCell>
                      )}
                      {elem.isActivated === true ? (
                        <TableCell sx={{ color: "red", fontWeight: "600" }}>
                          Да
                        </TableCell>
                      ) : (
                        <TableCell sx={{ color: "grey" }}>Нет</TableCell>
                      )}
                      <TableCell>
                        <IconButton onClick={() => deleteOtp(elem.code)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      {message && (
        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default CodesTableRow;
