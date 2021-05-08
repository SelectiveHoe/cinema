import { createStyles, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import {connect} from 'react-redux';
import React, { useEffect } from 'react';
import { AppState } from '../../../store';
import { getMovieByIdRequest } from '../../../store/movie/actions';
import imgNotFound from '../../../common/images/404.jpg';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  container: {
    marginTop: theme.spacing(2),
    width: '1000px',
    padding: theme.spacing(2),
  },
  image: {
    height: '250px',
    marginRight: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  optT: {

  },
  desc: {
    '& div': {
      marginBottom: theme.spacing(2),
      display: 'flex',
    },
    '& div p': {
      marginRight: theme.spacing(1),
    },
  }
}));

const mapStateToProps = (state: AppState) => ({
  currMovie: state.movie.movie.currMovie,
  isLoading: state.movie.movie.isViewLoading,
});

const mapDispatchToProps = {
  getMovieByIdRequest,
};

type Props = ReturnType<typeof mapStateToProps> &
  {
    [key in keyof typeof mapDispatchToProps]: (
      ...args: Parameters<typeof mapDispatchToProps[key]>
    ) => void;
  };

const Main: React.FC<Props> = ({ getMovieByIdRequest, currMovie, isLoading }) => {
  const classes = useStyles();
  const { id } = useParams<{ id?: string | undefined }>();

  useEffect(() => {
    if (id) {
      getMovieByIdRequest(parseInt(id, 10));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (currMovie) {
    return (
      <div className={classes.root}>
        <Paper className={classes.container}>
          <Typography variant="h4" className={classes.title}>
            {currMovie?.name}
          </Typography>
          <div style={{ display: 'flex' }}>
            <img alt={''} src={currMovie.photos[0] ? currMovie.photos[0].file : imgNotFound} className={classes.image}/>
            <div className={classes.desc}>
              <div>
                <Typography>
                  Страны:
                </Typography>
                <Typography>
                  {currMovie.countries.map(item => item.name).join(' ')}
                </Typography>
              </div>
              <div>
                <Typography>
                  Жанры:
                </Typography>
                <Typography>
                  {currMovie.genres.map(item => item.name).join(' ')}
                </Typography>
              </div>
              <div>
                <Typography>
                  Дата выпуска:
                </Typography>
                <Typography>
                  {currMovie.release_date}
                </Typography>
              </div>
              <div>
                <Typography>
                  Длительность:
                </Typography>
                <Typography>
                  {currMovie.duration}
                </Typography>
              </div>
              <div>
                <Typography>
                  Описание:
                </Typography>
                <Typography variant='caption'>
                  {currMovie.description} 
                </Typography>
              </div>
            </div>
          </div>
        </Paper>
      </div>
    );
  } else {
    return <></>
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
