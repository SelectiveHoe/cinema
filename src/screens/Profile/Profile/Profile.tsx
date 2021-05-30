import { Button, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import {connect} from 'react-redux';
import React from 'react';
import { AppState } from '../../../store';
import { useHistory } from 'react-router-dom';
import { getUserCredSuccess } from '../../../store/auth/actions';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.secondary.main,
    minHeight: '50px',
  },
  title: {
    fontFamily: ['Teko', 'sans-serif'].join(','),
    color: theme.palette.primary.main,
    fontSize: '2em',
    marginLeft: theme.spacing(2),
  },
  headerLink: {
    fontFamily: ['Teko', 'sans-serif'].join(','),
    color: theme.palette.primary.main,
    fontSize: '1.5em',
    marginLeft: theme.spacing(2),
  }
}));

const mapStateToProps = (state: AppState) => ({
});

const mapDispatchToProps = {
  getUserCredSuccess
};

type Props = ReturnType<typeof mapStateToProps> &
  {
    [key in keyof typeof mapDispatchToProps]: (
      ...args: Parameters<typeof mapDispatchToProps[key]>
    ) => void;
  };

const Main: React.FC<Props> = ({ getUserCredSuccess }) => {
  const classes = useStyles();
  const history = useHistory();

  const logout = () => {
    localStorage.clear();
    getUserCredSuccess(null);
    history.push('/login');
  }

  return (
    <div className={classes.root}>
      <Button variant="outlined" color="primary" style={{ width: '100px' }} onClick={logout}>Logout</Button>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
