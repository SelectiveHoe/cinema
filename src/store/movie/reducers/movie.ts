import { Country, Genre, Movie } from '../../../common/types/movie';
import {
  MovieAction,
  GET_MAIN_MOVIE_REQUEST,
  GET_MAIN_MOVIE_SUCCESS,
  GET_MAIN_MOVIE_FAILURE,
  GET_MOVIE_BYID_REQUEST,
  GET_MOVIE_BYID_SUCCESS,
  GET_MOVIE_BYID_FAILURE,
  SEARCH_MOVIE_REQUEST,
  SEARCH_MOVIE_SUCCESS,
  SEARCH_MOVIE_FAILED,
  SET_NEW_MOVIE,
  SET_RATING_MOVIE,
  MOVIE_OPTIONS_REQUEST,
  MOVIE_OPTIONS_SUCCESS,
  MOVIE_OPTIONS_FAILED,
} from '../types';

export type State = {
  foundFilms: Movie[],
  allCountry: Country[],
  allGenre: Genre[],
  newMovie: Movie[],
  ratingMovie: Movie[],
  historyMovie: Movie[],
  isLoading: boolean,
  currMovie: Movie | null,
  isViewLoading: boolean,
  isSearchLoading: boolean,
};

const initialState: State = {
  currMovie: null,
  isSearchLoading: false,
  newMovie: [],
  ratingMovie: [],
  historyMovie: [],
  allCountry: [],
  allGenre: [],
  isViewLoading: false,
  foundFilms: [],
  isLoading: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (
  state: State = initialState,
  action: MovieAction,
): State => {
  switch (action.type) {
    case MOVIE_OPTIONS_REQUEST:
      return {...state};
    case MOVIE_OPTIONS_SUCCESS:
      return {...state, allCountry: action.payload.country, allGenre: action.payload.genre};
    case MOVIE_OPTIONS_FAILED:
      return {...state};
    case SEARCH_MOVIE_REQUEST:
      return {...state, isSearchLoading: true};
    case SEARCH_MOVIE_SUCCESS:
      return {...state, isSearchLoading: false, foundFilms: action.payload};
    case SEARCH_MOVIE_FAILED:
      return {...state, isSearchLoading: false};
    case SET_NEW_MOVIE:
      return {...state, newMovie: action.payload.newFilms, historyMovie: action.payload.myFilms}
    case SET_RATING_MOVIE:
      return {...state, ratingMovie: action.payload}
    case GET_MAIN_MOVIE_REQUEST: 
      return {...state, isLoading: true}
    case GET_MAIN_MOVIE_SUCCESS: 
      return {...state, isLoading: false}
    case GET_MAIN_MOVIE_FAILURE: 
      return {...state, isLoading: false}
    case GET_MOVIE_BYID_REQUEST: 
      return {...state, isViewLoading: true, currMovie: null}
    case GET_MOVIE_BYID_SUCCESS:
      return {...state, isViewLoading: false, currMovie: action.payload}
    case GET_MOVIE_BYID_FAILURE:
      return {...state, isViewLoading: false, currMovie: null}
    default:
      return state;
  }
};
