import axios from 'axios';
import { BACK_END_HOST } from '../common/constants';
import { ApiResponse } from '../common/types/apiResponse';
import { Country, Genre, GetMovieRequest, Movie, SetTimeWatchFilmRequest, Subscribe } from '../common/types/movie';
import { User, UserLoginRequest, UserLoginResponse, UserRegistrationRequest } from '../common/types/user';

class Api {
  constructor() {
    axios.interceptors.request.use((config) => {
      const token = localStorage.getItem('accessToken');

      if (token) {
        config.headers.Authorization = `Token ${token}`;
      }

      return config;
    })
  }

  doCred = async (): Promise<ApiResponse<User>> => {
    const {data} = await axios.get(`${BACK_END_HOST}/auth/user_info/`);

    return {success: true, data};
  };

  doLogin = async (loginForm: UserLoginRequest): Promise<ApiResponse<UserLoginResponse>> => {
    const {data} = await axios.post(`${BACK_END_HOST}/auth/login/`, loginForm);

    return {success: true, data};
  };

  doRegistration = async (loginForm: UserRegistrationRequest): Promise<ApiResponse<any>> => {
    const {data} = await axios.post(`${BACK_END_HOST}/auth/user/`, loginForm);

    return {success: true, data};
  };

  getMovie = async (params: GetMovieRequest): Promise<ApiResponse<Movie[]>> => {
    const {data} = await axios.get(`${BACK_END_HOST}/movies/movie/`, { params });

    return {success: true, data};
  };

  getCountry = async (): Promise<ApiResponse<Country[]>> => {
    const {data} = await axios.get(`${BACK_END_HOST}/directory/country/`);

    return {success: true, data};
  };

  getGenre = async (): Promise<ApiResponse<Genre[]>> => {
    const {data} = await axios.get(`${BACK_END_HOST}/directory/movie_genre/`);

    return {success: true, data};
  };

  getMovieById = async (movieId: number): Promise<ApiResponse<Movie>> => {
    const {data} = await axios.get(`${BACK_END_HOST}/movies/movie/${movieId}`);

    return {success: true, data};
  };

  getSubscribes = async (): Promise<ApiResponse<Subscribe[]>> => {
    const {data} = await axios.get(`${BACK_END_HOST}/movies/subscription/`);

    return {success: true, data};
  };

  setTimeWatch = async (payload: SetTimeWatchFilmRequest): Promise<ApiResponse<boolean>> => {
    const {data} = await axios.post(`${BACK_END_HOST}/movies/set_time_watched/${payload.filmId}/`, {duration: payload.duration});

    return {success: true, data};
  };

  setCurrRatingMovie = async (payload: SetTimeWatchFilmRequest): Promise<ApiResponse<boolean>> => {
    const {data} = await axios.post(`${BACK_END_HOST}/movies/set_rating/${payload.filmId}/`, {rating: payload.duration});

    return {success: true, data};
  };
}

export default new Api();