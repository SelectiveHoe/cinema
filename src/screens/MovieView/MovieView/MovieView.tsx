import { Chip, createStyles, makeStyles, MenuItem, Paper, Select, Theme, Typography } from '@material-ui/core';
import {connect} from 'react-redux';
import React, { useEffect, useState } from 'react';
import { AppState } from '../../../store';
import { getMovieByIdRequest, setCurrentFilmRating, setTimeWatchFilmRequest } from '../../../store/movie/actions';
import imgNotFound from '../../../common/images/404.jpg';
import { useHistory, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { BACK_END_HOST } from '../../../common/constants';
import { Movie, Photo, Subscribe } from '../../../common/types/movie';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import { Rating } from '@material-ui/lab';
import PersonIcon from '@material-ui/icons/Person';
import CheckIcon from '@material-ui/icons/Check';
import HorizontalScroll from 'react-scroll-horizontal';
import PhotoView from '../../../component/PhotoView';

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
    marginBottom: theme.spacing(1),
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
  },
  ddQual: {
    width: '100px',
  },
  notSubscribeWin: {
    
    backgroundColor: theme.palette.secondary.light,
    width: '80%'
  },
  notSubscribeWinContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  subHeader: {
    borderRadius: '4px',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  subBody:{
    padding: theme.spacing(1),
  },
  photoScroll:{
    height: '250px',
    marginBottom: theme.spacing(1),
  },
}));


const mapStateToProps = (state: AppState) => ({
  currMovie: state.movie.movie.currMovie,
  isLoading: state.movie.movie.isViewLoading,
  subscribes: state.auth.userCred.currSubscribe,
  user: state.auth.userCred.currUser,
});

const mapDispatchToProps = {
  getMovieByIdRequest,
  setTimeWatchFilmRequest,
  setCurrentFilmRating,
};

type Props = ReturnType<typeof mapStateToProps> &
  {
    [key in keyof typeof mapDispatchToProps]: (
      ...args: Parameters<typeof mapDispatchToProps[key]>
    ) => void;
  };

const Main: React.FC<Props> = ({setCurrentFilmRating, setTimeWatchFilmRequest, getMovieByIdRequest, currMovie, subscribes, user, isLoading }) => {
  let player: ReactPlayer;
  let isFilmLoading: boolean = false;

  const [isTimerSet, setIsTimerSet] = useState<boolean>(false);
  const [currSec, setCurrSec] = useState<any>();
  const classes = useStyles();
  const [currQuality, setCurrQuality] = useState<string>(currMovie && currMovie.videos ? (currMovie.videos.video_360p ? '360' : currMovie.videos.video_480p ? '480' : currMovie.videos.video_720p ? '720' : '0' ) : '0');
  const { id } = useParams<{ id?: string | undefined }>();
  const [currUrl, setCurrUrl] = useState<string>('');
  const history = useHistory();

  useEffect(() => {
    setCurrQuality(currMovie && currMovie.videos ? (currMovie.videos.video_360p ? '360' : currMovie.videos.video_480p ? '480' : currMovie.videos.video_720p ? '720' : '0' ) : '0');
  }, [currMovie]);

  useEffect(() => {
    if (id) {
      getMovieByIdRequest(parseInt(id, 10));
      // eslint-disable-next-line react-hooks/exhaustive-deps
      isFilmLoading = true;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      if(currSec && currMovie) {
        setTimeWatchFilmRequest({ filmId: currMovie?.id, duration: parseInt(currSec.playedSeconds, 10) })
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currSec]);

  useEffect(() => {
    async function fetchBlob(currMovie: Movie | null) {
      if (currMovie && currQuality !== "0") {
        const result = await fetch(`${BACK_END_HOST}/movies/movie/stream_video/${currMovie.id}/${currQuality}/`, {
           headers: {
            Authorization: `Token ${localStorage.getItem('accessToken')}`
          }
        });
        if (result) {
          const blob = await result.blob();
          if (blob) {
            console.log(currMovie.id);
            setCurrUrl(URL.createObjectURL(blob))
          };
        }
      }
    }

    if (!isFilmLoading) fetchBlob(currMovie);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currMovie, currQuality, isLoading]);

  const setRaiting = (event: React.ChangeEvent<{}>, value: number | null) => {
    if(value && currMovie) {
      setCurrentFilmRating({filmId: currMovie.id, duration: value})
    }
  }

  const checkSubscribe = (userSubscribes: Subscribe[], filmsSubscribe: Subscribe[]): boolean => {
    if(filmsSubscribe.length === 0) {
      return true;
    }
    let isExist: boolean = false;
    for(var i = 0; i < filmsSubscribe.length; i++){
      for(var j = 0; j < userSubscribes.length; j++){
        if(filmsSubscribe[i].id === userSubscribes[j].id && userSubscribes[j].is_subscribed) {
          isExist = true;
          break;
        }
      }
      if(isExist) {
        break;
      }
    }
    return isExist;
  }

  const getTitlePhoto = (photos: Photo[]) => {
    for(var i = 0; i < photos.length; i++) {
      if (photos[i].is_title) {
        return photos[i].file;
      }
    }
    return photos[0] ? photos[0].file : imgNotFound;
  }
  if (currMovie && !isLoading) {
    return (
      <div className={classes.root}>
        <Paper className={classes.container}>
          <Typography variant="h4" className={classes.title}>
            {currMovie?.name}
          </Typography>
          <div style={{ display: 'flex' }}>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <img alt={''} src={getTitlePhoto(currMovie.photos)} className={classes.image}/>
              <Rating
                name="simple-controlled"
                precision={1}
                max={10}
                readOnly={!user}
                onChange={setRaiting}
                value={currMovie.rating}
              />

              <div style={{ display: 'flex' }}>
                <Typography>
                  {currMovie.rating} ???? 10 ({currMovie.user_rated_count})
                </Typography>
              </div>
              {currMovie.user_rating && 
              <div style={{ display: 'flex' }}>
                <CheckIcon style={{ color: '#40ff99' }}/>
                <Typography>
                  ???? ??????????????
                </Typography>
              </div>
              }
            </div>
            
            <div className={classes.desc}>
              <div>
                <Typography>
                  ????????????:
                </Typography>
                <Typography>
                  {currMovie.countries.map(item => item.name).join(' ')}
                </Typography>
              </div>
              <div>
                <Typography>
                  ??????????:
                </Typography>
                <Typography>
                  {currMovie.genres.map(item => item.name).join(' ')}
                </Typography>
              </div>
              <div>
                <Typography>
                  ???????? ??????????????:
                </Typography>
                <Typography>
                  {currMovie.release_date}
                </Typography>
              </div>
              <div>
                <Typography>
                  ????????????????????????:
                </Typography>
                <Typography>
                  {currMovie.duration}
                </Typography>
              </div>
              <div>
                <Typography>
                  ????????????????:
                </Typography>
                <Typography>
                  {currMovie.directors.map(item => item.name + ', ')} 
                </Typography>
              </div>
              <div>
                <Typography>
                  ????????????:
                </Typography> 
                <Typography>
                  {currMovie.actors.map(item => item.actor.name + ', ')} 
                </Typography>
              </div>
              <div>
                <Typography>
                  ????????????????:
                </Typography>
                <Typography variant='caption'>
                  {currMovie.description} 
                </Typography>
              </div>
            </div>
          </div>
          { currMovie.photos.length > 2 &&
          <div className={classes.photoScroll}>
            <HorizontalScroll>
              <div style={{ minWidth: '100vw', display: 'flex', justifyContent: 'center'}}>
                {currMovie.photos.map((item, index) => {
                  if (!item.is_title) {
                    return <PhotoView url={item.file} index={index}/>
                  } else {
                    return <></>
                  }
                })}
              </div>
            </HorizontalScroll>
          </div>}
          {checkSubscribe(subscribes, currMovie.subscriptions) ? 
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
            {currQuality !== null && currQuality !== "0" && !currMovie.subscription_active && currUrl && currMovie && currMovie.videos && (currMovie.videos.video_360p || currMovie.videos.video_480p || currMovie.videos.video_720p)  &&
            <>
              <ReactPlayer ref={ref => { if (ref) player = ref; }} 
              onReady={() => {
                if(!isTimerSet && player && currMovie && currMovie.time_watched && parseFloat(currMovie.time_watched) > 0) {
                  setIsTimerSet(true);
                  player.seekTo(parseFloat(currMovie.time_watched), 'seconds');
                }
              }}
               controls url={currUrl} onProgress={(obj) => {setCurrSec(obj)}}/>
              <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  className={classes.ddQual}
                  value={currQuality}
                  onChange={(name: string | unknown, val: unknown) => {
                    setCurrQuality((val as any).props.value)
                  }}
                >
                  {currMovie.videos.video_360p ? <MenuItem value={'360'}>360p</MenuItem> : ''}
                  {currMovie.videos.video_480p ? <MenuItem value={'480'}>480p</MenuItem> : ''}
                  {currMovie.videos.video_720p ? <MenuItem value={'720'}>720p</MenuItem> : ''}
                </Select>
              </div>
              </>
                }
            {currMovie.subscription_active && 
              <div className={classes.notSubscribeWinContainer}>
                <Paper elevation={3} className={classes.notSubscribeWin}>
                  <div className={classes.subHeader}>
                    <Typography variant="h6">
                      ???????????????? ???????????????? ?? ?????????????????? ???????????? ?? ????????????????.
                    </Typography>
                  </div>
                  <div className={classes.subBody}>
                    <Typography variant="body2">
                      ???????? ???????????????? ?????????? ???????????????? ??????????, ?????? ?????????????????? ???????????????? ?????????????????? ?? ???????? ??????????????: 
                      <Chip avatar={<PersonIcon style={{ height: '15px' }}/>} label={"Profile"} onClick={() => history.push('/main/profile')}/>
                    </Typography>
                    
                  </div>
                </Paper>
              </div>}
            </div>
          : <div className={classes.notSubscribeWinContainer}>
            <Paper elevation={3} className={classes.notSubscribeWin}>
              <div className={classes.subHeader}>
                <Typography variant="h6">
                  ???????????????? ???????????????? ?? ?????????????????? ???????????? ?? ????????????????.
                </Typography>
              </div>
              <div className={classes.subBody}>
                <Typography variant="body2">
                  ?????? ???? ???????????????? ???????????? ?? ?????????????????? ?????????????? ?????????????????? ?????? ?????????? ???????????????? ???????? ???? ?????????????????? ????????????????:
                </Typography>
                {currMovie.subscriptions.map(item => 
                  <Chip avatar={<LocalOfferIcon style={{ height: '15px' }}/>} label={item.name} onClick={() => history.push('/main/profile')}/>
                )}
              </div>
            </Paper>
          </div>}
        </Paper>
      </div>
    );
  } else {
    return <></>
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
