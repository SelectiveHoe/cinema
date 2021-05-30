export type Movie = {
  id: number,
  photos: Photo[],
  countries: Country[],
  genres: Genre[],
  name: string,
  rating: number,
  description: string,
  release_date: string,
  duration: number,
  time_watched: string,
  user_rating: number,
  user_rated_count: number,
  subscriptions: Subscribe[],
  videos: {
    video_360p: boolean,
    video_480p: boolean,
    video_720p: boolean,
  }
}

export type Country = {
  id: number,
  name: string,
}

export type Genre = {
  id: number,
  name: string,
}

export type GetOptionsResponse = {
  country: Country[],
  genre: Genre[],
}

export type SetTimeWatchFilmRequest = {
  filmId: number,
  duration: number,
}

export type Photo  = {
  file: string,
  is_title: boolean,
}

export type MainPage  = {
  newFilms: Movie[],
  myFilms: Movie[],
}

export type GetMovieRequest = {
  name?: string,
  year_from?: number,
  year_to?: number,
  duration_from?: string,
  duration_to?: string,
  ordering?: string,
  actors?: string,
  genres?: string,
  page?: number,
  page_size?: number,
  watched?: boolean,
}

export type Subscribe = {
  id: number;
  name: string;
  is_subscribed: boolean;
}