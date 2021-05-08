import { Country, Genre, Movie } from '../../../common/types/movie';
import {
  MovieAction,
  GET_MAIN_MOVIE_REQUEST,
  GET_MAIN_MOVIE_SUCCESS,
  GET_MAIN_MOVIE_FAILURE,
  GET_MOVIE_BYID_REQUEST,
  GET_MOVIE_BYID_SUCCESS,
  GET_MOVIE_BYID_FAILURE,
} from '../types';

export type State = {
  allFilms: Movie[],
  allCountry: Country[],
  allGenre: Genre[],
  isLoading: boolean,
  currMovie: Movie | null,
  isViewLoading: boolean,
};

const initialState: State = {
  currMovie: null,
  allCountry: [],
  allGenre: [],
  isViewLoading: false,
  allFilms: [],
  isLoading: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (
  state: State = initialState,
  action: MovieAction,
): State => {
  switch (action.type) {
    case GET_MAIN_MOVIE_REQUEST: 
      return {...state, isLoading: true}
    case GET_MAIN_MOVIE_SUCCESS: 
      return {...state, isLoading: false, allFilms: action.payload}
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
