import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import {connect} from 'react-redux';
import React from 'react';
import { AppState } from '../../../store';

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
  
};

type Props = ReturnType<typeof mapStateToProps> &
  {
    [key in keyof typeof mapDispatchToProps]: (
      ...args: Parameters<typeof mapDispatchToProps[key]>
    ) => void;
  };

const Main: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      Profile
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
