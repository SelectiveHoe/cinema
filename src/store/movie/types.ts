import { GetMovieRequest, Movie } from '../../common/types/movie';

export const GET_MAIN_MOVIE_REQUEST = '@Movie/main/get';
export const GET_MAIN_MOVIE_SUCCESS = '@Movie/main/success';
export const GET_MAIN_MOVIE_FAILURE = '@Movie/main/failure';

export const GET_MOVIE_BYID_REQUEST = '@Movie/byId/get';
export const GET_MOVIE_BYID_SUCCESS = '@Movie/byId/success';
export const GET_MOVIE_BYID_FAILURE = '@Movie/byId/failure';

export type GetMainMovieRequest = {
  type: typeof GET_MAIN_MOVIE_REQUEST;
  payload: GetMovieRequest,
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
  | GetMovieByIdFailure;