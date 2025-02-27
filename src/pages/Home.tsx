import { useState, useEffect } from "react";
import { fetchData } from "../utils/TmdbAPITools";
import { MOVIES_TRENDING_DAILY } from "../utils/APILinks";
import { MovieInterface } from "../interfaces/MovieInterface";
import { useLocation } from "react-router-dom";
import { getCurrentDate } from "../utils/GetCurrentDate";
import { saveMoviesToLocalStorage, getMoviesFromLocalStorage } from "../utils/MoviesLocalStorage";
import { MovieList } from "../components/MovieList";

const Home = () => {
    const [trendingMovies, setTrendingMovies] = useState<MovieInterface[]>([]);
    const [error, setError] = useState(false);
    const [currentDate] = useState(getCurrentDate());
    const location = useLocation();

    useEffect(() => {
        const { date, movies } = getMoviesFromLocalStorage();

        if (date && movies?.length > 0 && date === currentDate) {
            setTrendingMovies(movies);
        } else {
            fetchData(MOVIES_TRENDING_DAILY).then(response => {
                setTrendingMovies(response.results);
            }).catch(error => {
                error.log(error);
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
            {!error && MovieList(trendingMovies, location)}
        </>
    );
}

export default Home;