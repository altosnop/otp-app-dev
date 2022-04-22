import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  signin_wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
  },
  signin_form: {
    width: '25%',
  },
  signin_field: {
    margin: '10px',
  },
  signin_checkbox: {
    margin: '10px 0 20px',
  },
  signin_button: {
    margin: '10px',
  },
}));

export default useStyles;
