import { Movie } from "../interfaces/Movie";

export const saveMoviesToLocalStorage = (date: string, movies: Movie[]) => {
    localStorage.setItem('trendingMoviesDate', date);
    localStorage.setItem('trendingMovies', JSON.stringify(movies));
};

export const getMoviesFromLocalStorage = () => {
    const date = localStorage.getItem('trendingMoviesDate');
    const movies = localStorage.getItem('trendingMovies');
    return { date, movies: movies ? JSON.parse(movies) : [] };
};