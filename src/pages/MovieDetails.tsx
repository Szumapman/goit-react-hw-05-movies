import { Suspense, useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { fetchData } from "../utils/TmdbAPITools";
import { MOVIE, BASE_POSTER_PATH } from "../constants/APILinks";

const MovieDetails = () => {
    const [movie, setMovie] = useState(null);
    const { movieId } = useParams();
    const location = useLocation();
    const goBackRef = useRef<HTMLAnchorElement>(location.state?.from ?? "/movies");


    useEffect(() => {
        fetchData(`${MOVIE}${movieId}`).then(response => {
            setMovie(response);
        }).catch(error => {
            console.log(error);
        })
    }, [movieId]);

    if (!movie) {
        return;
    } 

    const { poster_path, title, vote_average, overview }: { poster_path: string, title: string, vote_average: number, overview: string } = movie;
    console.log(goBackRef.current)

    return (
        <main>
            <Link to={goBackRef.current}>Go back</Link>
            <div>
                <img src={poster_path ? `${BASE_POSTER_PATH}${poster_path}` : ''} alt={`${title} poster`} />
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
        </main>
    );
}

export default MovieDetails;