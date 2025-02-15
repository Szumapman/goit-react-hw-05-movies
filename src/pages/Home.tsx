import { useState, useEffect } from "react";
import { fetchData } from "../utils/TmdbAPITools";
import { MOVIES_TRENDING_DAILY } from "../constants//APILinks";
import { Movie } from "../interfaces/Movie";
import { Link, useLocation } from "react-router-dom";
import { getCurrentDate } from "../utils/GetCurrentDate";
import { saveMoviesToLocalStorage, getMoviesFromLocalStorage } from "../utils/MoviesLocalStorage";

export const Home = () => {
    const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
    const [error, setError] = useState(false);
    const [currentDate] = useState(getCurrentDate());
    const location = useLocation();

    useEffect(() => {
        const { date, movies } = getMoviesFromLocalStorage();

        if (date && movies && date === currentDate) {
            setTrendingMovies(movies);
        } else {
            fetchData(MOVIES_TRENDING_DAILY).then(response => {
                const movies = response.results;
                setTrendingMovies(movies);
            }).catch(error => {
                console.log(error);
                setError(error.message);
            });
        }
    }, [currentDate]);

    // useEffect(() => {
    //     const newDate = getCurrentDate();
    //     if (newDate !== currentDate) {
    //         setCurrentDate(newDate);
    //     }
    // }, []);

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
                    {trendingMovies.map(({ id, title, poster_path }) => (
                        <li key={id}>
                            <Link to={`/movies/${id}`} state={{ from: location }}>
                                <div>
                                    <img src={`https://image.tmdb.org/t/p/w300/${poster_path}`} alt={`${title} poster`} />
                                    <p>{title}</p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            }
        </>
    );
}