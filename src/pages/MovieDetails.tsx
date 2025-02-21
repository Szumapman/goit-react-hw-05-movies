import { Suspense, useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { MovieInterface } from "../interfaces/MovieInterface";
import { fetchData } from "../utils/TmdbAPITools";
import { MovieURL, PosterURL } from "../utils/APILinks";
import noPoster from "../assets/images/no_poster.jpg";
import css from './MovieDetails.module.css'

const MovieDetails = () => {
    const [movie, setMovie] = useState<MovieInterface>();
    const { movieId } = useParams();
    const location = useLocation();
    const goBackRef = useRef<HTMLAnchorElement>(location.state?.from ?? "/");


    useEffect(() => {
        fetchData(MovieURL(movieId)).then(response => {
            setMovie(response);
        }).catch(error => {
            error.log(error.message);
        })
    }, [movieId]);

    if (!movie) {
        return;
    } 

    const { poster_path, title, vote_average, overview } = movie;


    return (
        <div className={css.movieDetailsContainer}>
            <Link to={goBackRef.current} className={css.goBack}>Go back</Link>
            <div className={css.movieDetails}>
                <img src={poster_path ? PosterURL(poster_path) : noPoster} alt={poster_path ? `${title} poster` : `replacement poster for ${title}`} />
                <div className={css.movieInfo}>
                    <h2>{title}</h2>
                    <p>Rating: {vote_average.toFixed(1)}</p>
                    <p>Overview: {overview}</p>
                    <nav className={css.movieDetailsNav}>
                        <NavLink to="cast" className={({ isActive }) => isActive ? css.active : ""}>Cast</NavLink>
                        <NavLink to="reviews" className={({ isActive }) => isActive ? css.active : ""}>Reviews</NavLink>        
                    </nav>
                </div>
            </div>
                <Suspense fallback={<div>Loading...</div>}>
                    <Outlet />
                </Suspense> 
        </div>
    );
}

export default MovieDetails;