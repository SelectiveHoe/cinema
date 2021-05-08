import {combineReducers} from 'redux';
import auth from './auth/reducers';
import movie from './movie/reducers';

export default combineReducers({
  auth,
  movie,
});
