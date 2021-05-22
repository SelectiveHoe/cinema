import { GetMovieRequest, GetOptionsResponse, Movie } from '../../common/types/movie';

export const GET_MAIN_MOVIE_REQUEST = '@Movie/main/get';
export const GET_MAIN_MOVIE_SUCCESS = '@Movie/main/success';
export const GET_MAIN_MOVIE_FAILURE = '@Movie/main/failure';

export const GET_MOVIE_BYID_REQUEST = '@Movie/byId/get';
export const GET_MOVIE_BYID_SUCCESS = '@Movie/byId/success';
export const GET_MOVIE_BYID_FAILURE = '@Movie/byId/failure';

export const SEARCH_MOVIE_REQUEST = '@Movie/search/get';
export const SEARCH_MOVIE_SUCCESS = '@Movie/search/success';
export const SEARCH_MOVIE_FAILED = '@Movie/search/failure';

export const MOVIE_OPTIONS_REQUEST = '@Movie/options/get';
export const MOVIE_OPTIONS_SUCCESS = '@Movie/options/success';
export const MOVIE_OPTIONS_FAILED = '@Movie/options/failure';

export const SET_NEW_MOVIE = '@Movie/new/set';

export const SET_RATING_MOVIE = '@Movie/rating/set';

export type MovieOptionsRequest = {
  type: typeof MOVIE_OPTIONS_REQUEST;
};

export type MovieOptionsSuccess = {
  type: typeof MOVIE_OPTIONS_SUCCESS;
  payload: GetOptionsResponse;
};

export type MovieOptionsFailure = {
  type: typeof MOVIE_OPTIONS_FAILED;
};

export type SearchMovieRequest = {
  type: typeof SEARCH_MOVIE_REQUEST;
  payload: GetMovieRequest,
};

export type SearchMovieSuccess = {
  type: typeof SEARCH_MOVIE_SUCCESS;
  payload: Movie[];
};

export type SearchMovieFailure = {
  type: typeof SEARCH_MOVIE_FAILED;
};

export type SetNewMovie = {
  type: typeof SET_NEW_MOVIE;
  payload: Movie[],
};

export type SetRatingMovie = {
  type: typeof SET_RATING_MOVIE;
  payload: Movie[],
};

export type GetMainMovieRequest = {
  type: typeof GET_MAIN_MOVIE_REQUEST;
};

export type GetMainMovieSuccess = {
  type: typeof GET_MAIN_MOVIE_SUCCESS;
  payload: Movie[];
};

export type GetMainMovieFailure = {
  type: typeof GET_MAIN_MOVIE_FAILURE;
};

export type GetMovieByIdRequest = {
  type: typeof GET_MOVIE_BYID_REQUEST;
  payload: number,
};

export type GetMovieByIdSuccess = {
  type: typeof GET_MOVIE_BYID_SUCCESS;
  payload: Movie;
};

export type GetMovieByIdFailure = {
  type: typeof GET_MOVIE_BYID_FAILURE;
};

export type MovieAction =
  | GetMainMovieRequest
  | GetMainMovieSuccess
  | GetMainMovieFailure
  | GetMovieByIdRequest
  | GetMovieByIdSuccess
  | GetMovieByIdFailure
  | SetNewMovie
  | SetRatingMovie
  | SearchMovieRequest
  | SearchMovieSuccess
  | SearchMovieFailure
  | MovieOptionsRequest
  | MovieOptionsSuccess
  | MovieOptionsFailure;