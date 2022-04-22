import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  upload_wrapper: {
    display: 'flex',
    height: '80vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBar: {
    width: '90%',
    marginTop: '10%',
    borderRadius: '15px',
  },
  barBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
});

export default useStyles;
