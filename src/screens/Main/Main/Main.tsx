import { createStyles, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import {connect} from 'react-redux';
import React, { useEffect } from 'react';
import { AppState } from '../../../store';
import HorizontalListItem from '../../../component/HorizontalListItem';
import { getMainMovieRequest } from '../../../store/movie/actions';
import HorizontalScroll from 'react-scroll-horizontal';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  gridList: {
    flexWrap: 'nowrap',
    width: '100%',
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  movieContainer: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    padding: theme.spacing(1),
    height: '280px',
  },
  SectionName: {
    fontSize: '1.2em',
    color: theme.palette.primary.main,
  }
}));

const mapStateToProps = (state: AppState) => ({
  newMovie: state.movie.movie.newMovie,
  ratingMovie: state.movie.movie.ratingMovie,
  historyMovie: state.movie.movie.historyMovie,
  user: state.auth.userCred.currUser,
});

const mapDispatchToProps = {
  getMainMovieRequest
};

type Props = ReturnType<typeof mapStateToProps> &
  {
    [key in keyof typeof mapDispatchToProps]: (
      ...args: Parameters<typeof mapDispatchToProps[key]>
    ) => void;
  };

const Main: React.FC<Props> = ({ getMainMovieRequest, newMovie, ratingMovie, historyMovie, user }) => {
  const classes = useStyles();

  useEffect(() => {
    if (newMovie.length === 0 || ratingMovie.length === 0) {
      getMainMovieRequest();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.movieContainer}>
        <Typography color='secondary' className={classes.SectionName}>
          Popular
        </Typography>
          <HorizontalScroll>
            <div style={{ minWidth: '100vw', display: 'flex', justifyContent: 'center'}}>
              {ratingMovie.map(item => <HorizontalListItem isHorizontalSpace space movie={item} key={item.id}/>)}
            </div>
          </HorizontalScroll>
      </Paper>
      <Paper elevation={3} className={classes.movieContainer}>
        <Typography color='secondary' className={classes.SectionName}>
          Special
        </Typography>
          <HorizontalScroll pageLock>
            <div style={{ minWidth: '100vw', display: 'flex', justifyContent: 'center'}}>
              {newMovie.map(item => <HorizontalListItem isHorizontalSpace space movie={item} key={item.id}/>)}
            </div>
          </HorizontalScroll>
      </Paper>
      {!!user && 
      <Paper elevation={3} className={classes.movieContainer}>
        <Typography color='secondary' className={classes.SectionName}>
          MyList
        </Typography>
        <HorizontalScroll pageLock>
            <div style={{ minWidth: '100vw', display: 'flex', justifyContent: 'center'}}>
              {historyMovie.map(item => <HorizontalListItem isHorizontalSpace space movie={item} key={item.id}/>)}
            </div>
          </HorizontalScroll>
      </Paper>
      }
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
