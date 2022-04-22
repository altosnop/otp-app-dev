import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  appBar: {
    height: '70px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  inputContainer: {
    width: '25%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    marginLeft: '10%',
  },
  alert: {
    width: '30%',
    height: '8vh',
    marginRight: '10%',
    display: 'flex',
    alignItems: 'center',
    fontSize: '23px',
  },
  descripBox: {
    width: '30%',
    height: '8vh',
    marginRight: '10%',
    display: 'flex',
    alignItems: 'center',
    fontSize: '23px',
  },
  descripPaper: {
    width: '100%',
    textAlign: 'center',
    padding: '2%',
  },
  infoLineBox: {
    width: '100%',
    background: '#d32f2f',
    height: '70px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
    marginBottom: '2%',
  },
});

export default useStyles;
