import { Link } from "react-router-dom";
import { MovieInterface } from "../interfaces/MovieInterface";
import noPoster from "../assets/images/no_poster.jpg";
import { PosterURL } from "../utils/APILinks";
import { useEffect, useRef } from "react";
import css from './MovieList.module.css'
import BASE_PATH from "../constants/BASE_PATH";

export const MovieList = (movies: MovieInterface[], location: any) => {
    const movieRefs = useRef<{ [key: number]: HTMLAnchorElement | null }>({});

    useEffect(() => {
        if (!location.hash) return;
        const refToScrollTo = movieRefs.current[Number(location.hash.slice(1))];
        if (refToScrollTo) refToScrollTo.scrollIntoView({ behavior: "instant" });
    }, [movies]);

    return (
        <ul className={css.movieList}>
        { movies.map(({ id, title, poster_path }) => (
            <li key={id} id={String(id)} className={css.movieListItem}>
                <Link
                    to={`${BASE_PATH}movies/${id}#${id}`}
                    state={{ from: { ...location, hash: `#${id}` } }}
                    ref={(ref) => {
                        if (ref) (movieRefs.current[id] = ref)
                    }}
                >
                    <div>
                        <img src={poster_path ? PosterURL(poster_path) : noPoster} alt={poster_path ? `${title} poster` : `replacement poster for ${title}`} width={300} height={450} />
                        <p>{title}</p>
                    </div>
                </Link>
            </li>
        ))}
        </ul>
    );
};