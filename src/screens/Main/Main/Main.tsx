import { createStyles, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import {connect} from 'react-redux';
import React, { useEffect } from 'react';
import { AppState } from '../../../store';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import HorizontalListItem from '../../../component/HorizontalListItem';
import { getMainMovieRequest } from '../../../store/movie/actions';

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
  },
  SectionName: {
    fontSize: '1.2em',
    color: theme.palette.primary.main,
  }
}));

const mapStateToProps = (state: AppState) => ({
  movie: state.movie.movie.allFilms,
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

const test = ['Godzila vs Kong', '2', '3', '4','5', '6', '7', '8','9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];

const Main: React.FC<Props> = ({ getMainMovieRequest, movie }) => {
  const classes = useStyles();

  useEffect(() => {
    getMainMovieRequest({});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.movieContainer}>
        <Typography color='secondary' className={classes.SectionName}>
          New
        </Typography>
          <ScrollMenu 
            alignCenter={false}
            data={movie.map(item => <HorizontalListItem space movie={item} key={item.id}/>)}
          />
      </Paper>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
