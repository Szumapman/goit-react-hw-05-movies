import { useState, useEffect } from "react";
import { MovieInterface } from "../interfaces/MovieInterface";
import { fetchData } from "../utils/TmdbAPITools";
import { MOVIES_SEARCH } from "../utils/APILinks";
import { useLocation, useSearchParams } from "react-router-dom";
import { MovieList } from "../components/MovieList";
import css from './Movies.module.css'

const Movies = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState<MovieInterface[]>([]);
    const [error, setError] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const movie = searchParams.get('movie');
    const location = useLocation();
    
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
            <form  onSubmit={handleSubmit} id="search-form" className={css.searchForm}>
                <input
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search movies"
                    onChange={handleQuery}
                    className={css.searchInput}
                />
                <button type="submit" className={css.searchButton}>
                    <span>Search</span>
                </button>
            </form>
            {error && <p>{error}</p>}
            {!error && MovieList(movies, location)}
        </>
    );
}

export default Movies;