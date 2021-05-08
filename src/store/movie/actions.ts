import { GetMovieRequest, Movie } from '../../common/types/movie';
import {
  GET_MAIN_MOVIE_REQUEST,
  GET_MAIN_MOVIE_SUCCESS,
  GET_MAIN_MOVIE_FAILURE,
  GET_MOVIE_BYID_REQUEST,
  GET_MOVIE_BYID_SUCCESS,
  GET_MOVIE_BYID_FAILURE,
  GetMainMovieRequest,
  GetMainMovieSuccess,
  GetMainMovieFailure,
  GetMovieByIdRequest,
  GetMovieByIdSuccess,
  GetMovieByIdFailure,
} from './types';

export const getMainMovieRequest = (payload: GetMovieRequest): GetMainMovieRequest => ({
  type: GET_MAIN_MOVIE_REQUEST,
  payload,
});

export const getMainMovieSuccess = (payload: Movie[]): GetMainMovieSuccess => ({
  type: GET_MAIN_MOVIE_SUCCESS,
  payload,
});

export const getMainMovieFailure = (): GetMainMovieFailure => ({
  type: GET_MAIN_MOVIE_FAILURE,
});

export const getMovieByIdRequest = (payload: number): GetMovieByIdRequest => ({
  type:   GET_MOVIE_BYID_REQUEST,
  payload,
});

export const getMovieByIdSuccess = (payload: Movie): GetMovieByIdSuccess => ({
  type: GET_MOVIE_BYID_SUCCESS,
  payload,
});

export const getMovieByIdFailure = (): GetMovieByIdFailure => ({
  type: GET_MOVIE_BYID_FAILURE,
});