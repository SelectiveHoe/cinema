import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import ScheduleIcon from '@material-ui/icons/Schedule';
import React from 'react';
import { useHistory } from 'react-router-dom';
import OpenWithIcon from '@material-ui/icons/OpenWith';

export type Props = {
  url: string,
  index?: number,
};

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  icon: {
    height: '250px',
    position: 'relative',
    transition: 'all .2s',
    '&:hover': {
      cursor: 'pointer',
      opacity: '.8'
    },
    '&:hover $mainContainer': {
      opacity: '1',
    },
  },
  mainContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(0%, -50%)',
    opacity: '0',
    transition: 'all .2s',
  }
}));

const PhotoView: React.FC<Props> = ({ url, index }) => {
  const classes = useStyles();

  return (
    <div className={classes.icon}>
      <img src={url} alt='' style={{ height: '250px', marginLeft: index !== 0 ? '16px' : '0px' }} />
      <OpenWithIcon className={classes.mainContainer}/>
    </div>
  );
};

export default PhotoView;
