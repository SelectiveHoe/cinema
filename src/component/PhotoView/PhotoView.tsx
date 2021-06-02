import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';

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
    </div>
  );
};

export default PhotoView;
