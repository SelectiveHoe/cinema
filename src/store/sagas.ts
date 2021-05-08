import {all} from 'redux-saga/effects';
import auth from './auth/sagas';
import movie from './movie/sagas';

// eslint-disable-next-line import/no-anonymous-default-export
export default function* () {
  yield all([
    ...auth,
    ...movie,
  ]);
}
