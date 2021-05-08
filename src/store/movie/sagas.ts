import { ApiResponse } from '../../common/types/apiResponse';
import {call, put, takeLatest} from 'redux-saga/effects';
import Api from '../../services/api';
import * as Actions from './actions';
import { GetMainMovieRequest, GET_MAIN_MOVIE_REQUEST, GetMovieByIdRequest, GET_MOVIE_BYID_REQUEST } from './types';
import { Movie } from '../../common/types/movie';

export function* getMovies(action: GetMainMovieRequest) {
  try {
    const response: ApiResponse<any> = yield call(Api.getMovie, action.payload);
    if (response.success) {
      yield put(Actions.getMainMovieSuccess(response.data));
    }
  } catch (error) {
    yield put(Actions.getMainMovieFailure());
  }
}

export function* getMovieById(action: GetMovieByIdRequest) {
  try {
    const response: ApiResponse<Movie> = yield call(Api.getMovieById, action.payload);
    if (response.success) {
      yield put(Actions.getMovieByIdSuccess(response.data));
    }
  } catch (error) {
    yield put(Actions.getMovieByIdFailure());
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  takeLatest(GET_MAIN_MOVIE_REQUEST, getMovies),
  takeLatest(GET_MOVIE_BYID_REQUEST, getMovieById),
];
