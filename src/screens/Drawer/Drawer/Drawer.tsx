import { createStyles, makeStyles, TextField, Theme, Typography } from '@material-ui/core';
import {connect} from 'react-redux';
import React, { useEffect } from 'react';
import { AppState } from '../../../store';
import { PrivateRoute } from '../../../component/PrivateRoute';
import { Redirect, Switch, Link, Route } from 'react-router-dom';
import Catalog from '../../Catalog';
import Profile from '../../Profile';
import Main from '../../Main';
import MovieView from '../../MovieView';
import { getMovieOptionsRequest } from '../../../store/movie/actions';

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
  genres: state.movie.movie.allGenre,
  country: state.movie.movie.allCountry,
  user: state.auth.userCred.currUser,
});

const mapDispatchToProps = {
  getMovieOptionsRequest
};

type Props = ReturnType<typeof mapStateToProps> &
  {
    [key in keyof typeof mapDispatchToProps]: (
      ...args: Parameters<typeof mapDispatchToProps[key]>
    ) => void;
  };

const Drawer: React.FC<Props> = ({ getMovieOptionsRequest, genres, country, user }) => {
  const classes = useStyles();

  useEffect(() => {
    if ( genres.length === 0 && country.length === 0 ) {
      getMovieOptionsRequest();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          {user ? 
          <Link to="/main/profile" className={classes.link}>
            <Typography className={classes.headerLink}>
              Profile
            </Typography>
          </Link>
          :
          <Link to="/login" className={classes.link}>
            <Typography className={classes.headerLink}>
              Login
            </Typography>
          </Link>
          }
        </div>
        <div className={classes.SideHeader}>
          <TextField label="Search" variant="outlined" size="small" className={classes.searchField}/>
        </div>
      </div>
      <Switch>
        <Route path={"/main/catalog"} component={Catalog}/>
        <PrivateRoute path={"/main/profile"} component={Profile}/>
        <Route path={"/main/movie/:id"} component={MovieView}/>
        <Route path={"/main"} component={Main}/>
        <Redirect
        to={"/main"}
        />
      </Switch>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
