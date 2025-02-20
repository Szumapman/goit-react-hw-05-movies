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
    console.log(goBackRef.current);


    useEffect(() => {
        fetchData(MovieURL(movieId)).then(response => {
            setMovie(response);
        }).catch(error => {
            console.log(error);
        })
    }, [movieId]);

    if (!movie) {
        return;
    } 

    const { poster_path, title, vote_average, overview } = movie;

    return (
        <div className={css.movieDetailsContainer}>
            <Link to={goBackRef.current} className={css.goBack}>Go {location.state?.from ? "back" : "home"}</Link>
            <div className={css.movieDetails}>
                <img src={poster_path ? PosterURL(poster_path) : noPoster} alt={poster_path ? `${title} poster` : `replacement poster for ${title}`} />
                <div className={css.movieInfo}>
                    <h2>{title}</h2>
                    <p>Rating: {vote_average.toFixed(1)}</p>
                    <p>Overview: {overview}</p>
                </div>
            </div>
            <nav className={css.movieDetailsNav}>
                    <NavLink to="cast">Cast</NavLink>
                    <NavLink to="reviews">Reviews</NavLink>
            </nav>
                <Suspense fallback={<div>Loading...</div>}>
                    <Outlet />
                </Suspense> 
        </div>
    );
}

export default MovieDetails;