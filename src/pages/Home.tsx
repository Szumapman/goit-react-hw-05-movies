import { useState, useEffect, use } from "react";
import { fetchData } from "../utils/TmdbAPITools";
import { MOVIES_TRENDING_DAILY } from "../constants//APILinks";
import { Movie } from "../interfaces/Movie";
import { useLocation } from "react-router-dom";
import { getCurrentDate } from "../utils/GetCurrentDate";
import { saveMoviesToLocalStorage, getMoviesFromLocalStorage } from "../utils/MoviesLocalStorage";
import { createMovieListItems } from "../utils/CreateMovieListItems";
import useScrollToHash from "../hooks/useScrollToHash";

const Home = () => {
    const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
    const [error, setError] = useState(false);
    const [currentDate] = useState(getCurrentDate());
    const location = useLocation();

    useScrollToHash();

    useEffect(() => {
        const { date, movies } = getMoviesFromLocalStorage();

        if (date && movies?.length > 0 && date === currentDate) {
            setTrendingMovies(movies);
        } else {
            fetchData(MOVIES_TRENDING_DAILY).then(response => {
                setTrendingMovies(response.results);
            }).catch(error => {
                console.log(error);
                setError(error.message);
            });
        }
    }, [currentDate]);

    useEffect(() => {
        if (trendingMovies.length > 0) {
            saveMoviesToLocalStorage(currentDate, trendingMovies);
        }
    }, [trendingMovies]);

    return (
        <>
            {error && <p>{error}</p>}
            {!error &&
                <ul>
                    {createMovieListItems(trendingMovies, location)}
                </ul>
            }
        </>
    );
}

export default Home;