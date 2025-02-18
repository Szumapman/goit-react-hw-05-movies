export const BASE_TMDB_API_URL = "https://api.themoviedb.org/3/";

export const MOVIES_TRENDING_DAILY = "trending/movie/day";

export const MOVIES_SEARCH = "search/movie";

export const MovieURL = (id: String | undefined) => `movie/${id}`;

export const PosterURL = (poster_path: String) => `https://image.tmdb.org/t/p/w300/${poster_path}`;

export const CastPhotoURL = (photo_path: String) => `https://image.tmdb.org/t/p/w200/${photo_path}`;

export const MovieCreditsURL = (id: String | undefined) => `movie/${id}/credits`;