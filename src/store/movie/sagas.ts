import { ApiResponse } from '../../common/types/apiResponse';
import {call, delay, put, takeLatest} from 'redux-saga/effects';
import Api from '../../services/api';
import * as Actions from './actions';
import { SearchMovieRequest, GET_MAIN_MOVIE_REQUEST, GetMovieByIdRequest, GET_MOVIE_BYID_REQUEST, SEARCH_MOVIE_REQUEST, MOVIE_OPTIONS_REQUEST } from './types';
import { Country, Movie } from '../../common/types/movie';

export function* getMovies() {
  try {
    const responseNewMovie: ApiResponse<Movie[]> = yield call(Api.getMovie, { ordering: '-date'});
    const responseRatingMovie: ApiResponse<Movie[]> = yield call(Api.getMovie, { ordering: '-name' });

    if (responseNewMovie.success) {
      yield put(Actions.setNewMovie(responseNewMovie.data));
    }
    if (responseRatingMovie.success) {
      yield put(Actions.setRatingMovie(responseRatingMovie.data));
    }
  } catch (error) {
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

export function* searchMovie(action: SearchMovieRequest) {
  yield delay(1000);
  try {
    const response: ApiResponse<Movie[]> = yield call(Api.getMovie, action.payload);
    if (response.success) {
      yield put(Actions.searchMovieSuccess(response.data));
    }
  } catch (error) {
    yield put(Actions.searchMovieFailure());
  }
}

export function* getOptions() {
  try {
    const responseCountry: ApiResponse<Country[]> = yield call(Api.getCountry);
    const responseGenre: ApiResponse<Country[]> = yield call(Api.getGenre);
    if (responseCountry.success && responseGenre.success) {
      yield put(Actions.getMovieOptionsSuccess({ genre: responseGenre.data, country: responseCountry.data }));
    }
  } catch (error) {
    yield put(Actions.searchMovieFailure());
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  takeLatest(GET_MAIN_MOVIE_REQUEST, getMovies),
  takeLatest(GET_MOVIE_BYID_REQUEST, getMovieById),
  takeLatest(SEARCH_MOVIE_REQUEST, searchMovie),
  takeLatest(MOVIE_OPTIONS_REQUEST, getOptions),
];
