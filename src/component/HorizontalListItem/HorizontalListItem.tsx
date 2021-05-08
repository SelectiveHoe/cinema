import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import ScheduleIcon from '@material-ui/icons/Schedule';
import React from 'react';
import { useHistory } from 'react-router-dom';
import imgNotFound from '../../common/images/404.jpg';
import { Movie } from '../../common/types/movie';

export type Props = {
  movie: Movie,
  space?: boolean,
};

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  item: {
    height: '250px',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    transition: 'all .1s ease-out',
    '&:hover': {
      cursor: 'pointer',
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(2),
    },
    '&:hover $itemText': {
      height: '60px',
    },
    '&:hover $rateText': {
      opacity: '1',
    },
  },
  itemText: {
    transition: 'all .1s ease-out',
    overflow: 'hidden',
    background: 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.8))',
    position: 'absolute',
    bottom: '0px',
    height: '32px',
    display: 'flex',
    flexDirection: 'column',
    color: 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5))',
    width: '100%',
  },
  image: {
    height: '100%',
    width: '100%',
    backgroundSize: '',
  },
  rateText: {
    alignItems: 'center',
    transition: 'all .1s ease-out',
    overflow: 'hidden',
    position: 'absolute',
    top: '0px',
    right: '5px',
    opacity: 0,
    display: 'flex',
  },
}));

const HorizontalListItem: React.FC<Props> = ({ movie, space }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.item} style={{ marginBottom: !space ? '16px' : '0px'}} onClick={() => { history.push(`/main/movie/${movie.id}`) }}>
      <div className={classes.image}>
        <img alt={''} src={movie.photos[0] ? movie.photos[0].file : imgNotFound} style={{ height: '250px' }}/>
      </div>
      <div className={classes.itemText}>
        <Typography style={{padding: '4px 8px', color: 'white'}}>
          {movie.name}
        </Typography>
        <Typography variant="caption" style={{ padding: '4px 8px', color: 'white' }}>
          Genres: {movie.genres.map(item => item.name).join(' ')}
        </Typography>
      </div>
      <div className={classes.rateText}>
        <Typography style={{ padding: '4px 8px', color: 'white'}}>
          {movie.duration}
        </Typography>
        <ScheduleIcon style={{ color: 'white' }}/>
      </div>
    </div>
  );
};

export default HorizontalListItem;
