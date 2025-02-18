import { Link } from "react-router-dom";
import { Movie } from "../interfaces/Movie";
import noPoster from "../assets/images/no_poster.jpg";
import { PosterURL } from "./APILinks";

export const createMovieListItems = (movies: Movie[], location: any) => {
    return movies.map(({ id, title, poster_path }) => (
        <li key={id} id={String(id)}>
            <Link to={`/movies/${id}#${id}`} state={{ from: { ...location, hash: `#${id}` } }}>
                <div>
                    <img src={poster_path ? PosterURL(poster_path) : noPoster} alt={poster_path ? `${title} poster` : `replacement poster for ${title}`} />
                    <p>{title}</p>
                </div>
            </Link>
        </li>
    ));
};