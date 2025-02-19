import { MovieInterface } from "../interfaces/MovieInterface";

export const saveMoviesToLocalStorage = (date: string, movies: MovieInterface[]) => {
    localStorage.setItem('trendingMoviesDate', date);
    localStorage.setItem('trendingMovies', JSON.stringify(movies));
};

export const getMoviesFromLocalStorage = () => {
    const date = localStorage.getItem('trendingMoviesDate');
    const movies = localStorage.getItem('trendingMovies');
    return { date, movies: movies ? JSON.parse(movies) : [] };
};