import {makeStyles, Theme} from '@material-ui/core/styles';

export const getFinalFormStyle = makeStyles((theme: Theme) => ({
  helper: {
    marginLeft: 0,
    whiteSpace: 'nowrap',
    minHeight: 20,
    [theme.breakpoints.down('md')]: {
      whiteSpace: 'pre-wrap',
    }
  },
  rootLabel: {
    // marginRight: theme.spacing(1.5),
    marginBottom: 1,
    margin: 0,
  },
  labelForState: {
    display: 'flex',
    backgroundColor: '#546e7a',
    color: '#FFFFFF',
    justifyContent: 'center',
    width: 30,
    borderRadius: 5,
    fontSize: '0.8em',
  },
  labelForStateCheck: {
    backgroundColor: '#42A5F5',
  },
  checkState: {
    display: 'none',
  },
  checkBox: {
    display: 'flex',
    alignItems: 'center',
  }
}));
