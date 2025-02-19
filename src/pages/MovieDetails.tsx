import { Suspense, useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { MovieInterface } from "../interfaces/MovieInterface";
import { fetchData } from "../utils/TmdbAPITools";
import { MovieURL, PosterURL } from "../utils/APILinks";
import noPoster from "../assets/images/no_poster.jpg";

const MovieDetails = () => {
    const [movie, setMovie] = useState<MovieInterface>();
    const { movieId } = useParams();
    const location = useLocation();
    const goBackRef = useRef<HTMLAnchorElement>(location.state?.from ?? "/movies");


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
        <>
            <Link to={goBackRef.current}>Go back</Link>
            <div>
                <img src={poster_path ?  PosterURL(poster_path) : noPoster} alt={poster_path ? `${title} poster` : `replacement poster for ${title}`} />
                <h2>{title}</h2>
                <p>Rating: {vote_average.toFixed(1)}</p>
                <p>Overview: {overview}</p>
                <div>
                    <NavLink to="cast">Cast</NavLink>
                </div>
                <div>
                    <NavLink to="reviews">Reviews</NavLink>
                </div>
                <Suspense fallback={<div>Loading...</div>}>
                    <Outlet />
                </Suspense> 
            </div>   
        </>
    );
}

export default MovieDetails;