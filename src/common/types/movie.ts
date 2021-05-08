export type Movie = {
  id: number,
  photos: Photo[],
  countries: Country[],
  genres: Genre[],
  name: string,
  description: string,
  release_date: string,
  duration: number,
}

export type Country = {
  id: number,
  name: string,
}

export type Genre = {
  id: number,
  name: string,
}

export type Photo  = {
  file: string,
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
}