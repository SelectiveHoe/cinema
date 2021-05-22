import { GetMovieRequest, GetOptionsResponse, Movie } from '../../common/types/movie';
import {
  GET_MAIN_MOVIE_REQUEST,
  GET_MAIN_MOVIE_SUCCESS,
  GET_MAIN_MOVIE_FAILURE,
  GET_MOVIE_BYID_REQUEST,
  GET_MOVIE_BYID_SUCCESS,
  GET_MOVIE_BYID_FAILURE,
  SEARCH_MOVIE_REQUEST,
  SEARCH_MOVIE_SUCCESS,
  SEARCH_MOVIE_FAILED,
  MOVIE_OPTIONS_REQUEST,
  MOVIE_OPTIONS_SUCCESS,
  MOVIE_OPTIONS_FAILED,
  SET_NEW_MOVIE,
  SET_RATING_MOVIE,
  SetNewMovie,
  SetRatingMovie,
  GetMainMovieRequest,
  GetMainMovieSuccess,
  GetMainMovieFailure,
  GetMovieByIdRequest,
  GetMovieByIdSuccess,
  GetMovieByIdFailure,
  SearchMovieRequest,
  SearchMovieSuccess,
  SearchMovieFailure,
  MovieOptionsRequest,
  MovieOptionsSuccess,
  MovieOptionsFailure,
} from './types';

export const getMovieOptionsRequest = (): MovieOptionsRequest => ({
  type: MOVIE_OPTIONS_REQUEST,
});

export const getMovieOptionsSuccess = (payload: GetOptionsResponse): MovieOptionsSuccess => ({
  type: MOVIE_OPTIONS_SUCCESS,
  payload,
});

export const getMovieOptionsFailure = (): MovieOptionsFailure => ({
  type: MOVIE_OPTIONS_FAILED,
});

export const searchMovieRequest = (payload: GetMovieRequest): SearchMovieRequest => ({
  type: SEARCH_MOVIE_REQUEST,
  payload,
});

export const searchMovieSuccess = (payload: Movie[]): SearchMovieSuccess => ({
  type: SEARCH_MOVIE_SUCCESS,
  payload,
});

export const searchMovieFailure = (): SearchMovieFailure => ({
  type: SEARCH_MOVIE_FAILED,
});

export const setNewMovie = (payload: Movie[]): SetNewMovie => ({
  type: SET_NEW_MOVIE,
  payload,
});

export const setRatingMovie = (payload: Movie[]): SetRatingMovie => ({
  type: SET_RATING_MOVIE,
  payload,
});

export const getMainMovieRequest = (): GetMainMovieRequest => ({
  type: GET_MAIN_MOVIE_REQUEST,
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