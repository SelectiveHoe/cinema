import { createStyles, makeStyles, TextField, Theme, Typography } from '@material-ui/core';
import {connect} from 'react-redux';
import React from 'react';
import { AppState } from '../../../store';
import { PrivateRoute } from '../../../component/PrivateRoute';
import { Redirect, Switch, Link } from 'react-router-dom';
import Catalog from '../../Catalog';
import Profile from '../../Profile';
import Main from '../../Main';
import MovieView from '../../MovieView';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.secondary.main,
    minHeight: '50px',
  },
  SideHeader: {
    display: 'flex',
    alignItems: 'center',
  },
  searchField: {
    width: '400px',
    marginRight: theme.spacing(2),
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
    marginLeft: theme.spacing(4),
  },
  link: {
    textDecoration: 'none',
  },
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

const Drawer: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div className={classes.SideHeader}>
          <Link to="/main" className={classes.link}>
            <Typography className={classes.title}>
              CINEMA
            </Typography>
          </Link>
          <Link to="/main" className={classes.link}>
            <Typography className={classes.headerLink}>
              Main
            </Typography>
          </Link>
          <Link to="/main/catalog" className={classes.link}>
            <Typography className={classes.headerLink}>
              Catalog
            </Typography>
          </Link>
          <Link to="/main/profile" className={classes.link}>
            <Typography className={classes.headerLink}>
              Profile
            </Typography>
          </Link>
        </div>
        <div className={classes.SideHeader}>
          <TextField label="Search" variant="outlined" size="small" className={classes.searchField}/>
        </div>
      </div>
      <Switch>
        <PrivateRoute path={"/main/catalog"} component={Catalog}/>
        <PrivateRoute path={"/main/profile"} component={Profile}/>
        <PrivateRoute path={"/main/movie/:id"} component={MovieView}/>
        <PrivateRoute path={"/main"} component={Main}/>
        <Redirect
        to={"/main"}
        />
      </Switch>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
