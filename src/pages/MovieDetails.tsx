import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { fetchData } from "../utils/TmdbAPITools";
import { MOVIE, BASE_POSTER_PATH } from "../constants/APILinks";

const MovieDetails = () => {
    const [movie, setMovie] = useState(null);
    const { movieId } = useParams();
    const loation = useLocation();


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

    const { poster_path, title, vote_average, overview  }: { poster_path: string, title: string, vote_average: number, overview: string} = movie;

    return (
        <>
            {movie &&
                <div>
                    <Link to={loation.state.from}>Go back</Link>
                    <img src={poster_path ? `${BASE_POSTER_PATH}${poster_path}` : ''} alt={`${title} poster`} />
                    <h2>{title}</h2>
                    <p>Rating: {vote_average.toFixed(1)}</p>
                    <p>Overview: {overview}</p>
                </div>
            }
        </>
    );
}

export default MovieDetails;