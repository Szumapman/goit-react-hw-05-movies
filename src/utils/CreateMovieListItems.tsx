import { Link } from "react-router-dom";
import { Movie } from "../interfaces/Movie";
import noPoster from "../assets/images/no_poster.jpg";

export const createMovieListItems = (movies: Movie[], location: any) => {
    return movies.map(({ id, title, poster_path }) => (
        <li key={id} id={String(id)}>
            <Link to={`/movies/${id}#${id}`} state={{ from: { ...location, hash: `#${id}` } }}>
                <div>
                    <img src={poster_path ? `https://image.tmdb.org/t/p/w300/${poster_path}` : noPoster} alt={`${title} poster`} />
                    <p>{title}</p>
                </div>
            </Link>
        </li>
    ));
};