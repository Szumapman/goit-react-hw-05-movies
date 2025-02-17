import { useState, useEffect } from "react";
import { fetchData } from "../utils/TmdbAPITools";
import { MOVIES_SEARCH } from "../constants/APILinks";
import { useLocation, useSearchParams } from "react-router-dom";
import { createMovieListItems } from "../utils/CreateMovieListItems";
import useScrollToHash from "../hooks/useScrollToHash";

const Movies = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const movie = searchParams.get('movie');
    const location = useLocation();

    useScrollToHash();
    
    const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    useEffect(() => {
        if (movie) {
            fetchData(MOVIES_SEARCH, movie).then(response => {
                setMovies(response.results);
            }).catch(error => {
                setError(error.message);
            });
        }
    }, [movie]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (query.trim() === '') {
            return;
        }
        setSearchParams({ movie: query });
        fetchData(MOVIES_SEARCH, query).then(response => {
            setMovies(response.results);
        }).catch(error => {
            setError(error.message);
        });
        form.reset();
    };

    return (
        <>
            <form  onSubmit={handleSubmit} id="search-form">
                <button type="submit">
                    <span>Search</span>
                </button>

                <input
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search movies"
                    onChange={handleQuery}
                />
            </form>
            {error && <p>{error}</p>}
            {!error &&
                <ul>
                    {createMovieListItems(movies, location)}
                </ul>
            }
        </>
    );
}

export default Movies;