import { Button, createStyles, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import {connect} from 'react-redux';
import React from 'react';
import { AppState } from '../../../store';
import { useHistory } from 'react-router-dom';
import { getUserCredSuccess } from '../../../store/auth/actions';
import profileImg from '../../../common/images/profile.png';
import { BorderColor } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
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
  },
  profileContainer: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    minWidth: '900px',
    display: 'flex',
  },
  leftSide: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRight: '1px solid ' + theme.palette.primary.main,
    marginRight: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  subContainer: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
  }
}));

const mapStateToProps = (state: AppState) => ({
  user: state.auth.userCred.currUser,
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

const Main: React.FC<Props> = ({ getUserCredSuccess, user }) => {
  const classes = useStyles();
  const history = useHistory();

  const logout = () => {
    localStorage.clear();
    getUserCredSuccess(null);
    history.push('/login');
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.profileContainer}>
        <div className={classes.leftSide}>
          <img src={profileImg} alt="" style={{ width: '300px' }}></img>
          <Button variant="outlined" color="primary" style={{ width: '250px', marginTop: '16px' }} onClick={logout}>Logout</Button>
        </div>
        <div style={{ width: '100%' }}>
          <Typography variant="h4">{user?.first_name} {user?.last_name}</Typography>
          <Typography variant="subtitle1">E-mail: {user?.email}</Typography>
          <Typography variant="subtitle1">Phone number: {user?.phone}</Typography>
          <Typography variant="subtitle1">Username: {user?.username}</Typography>
          <Typography variant="subtitle1">Birth date: {user?.date_birth}</Typography>
          <Typography variant="subtitle1">Description: {user?.description}</Typography>

        </div>
      </Paper>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
