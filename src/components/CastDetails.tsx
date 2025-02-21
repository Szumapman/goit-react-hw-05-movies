import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../utils/TmdbAPITools";
import { CastInterface } from "../interfaces/CastInterface";
import { MovieCreditsURL } from "../utils/APILinks";
import { CastPhotoURL } from "../utils/APILinks";
import noPhoto from "../assets/images/no_photo.jpg";
import css from './CastDetails.module.css'

const CastDetails = () => {
    const [cast, setCast] = useState<CastInterface[]>([]);
    const { movieId } = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetchData(MovieCreditsURL(movieId)).then(response => {
            setCast(response.cast);
        }).catch(error => {
            error.log(error);
        }).finally(() => {
            setLoading(false);
        });
    }, [movieId]);

    return (
        <>
            {loading && <p>Loading...</p>}
            {!loading && cast.length > 0 && <ul className={css.castList}>
                {cast.map(({ id, profile_path, name, character }) => (
                    <li key={id} className={css.castListItem}>
                        <img src={profile_path ? CastPhotoURL(profile_path) : noPhoto} alt={profile_path ? `${name} photo` : `replacement image for ${name}`} />
                        <p>{name}</p>
                        <p>Character: {character}</p>
                    </li>
                ))}
            </ul>}
            {!loading && cast.length === 0 && <p>Sorry, we have no information about cast for this movie.</p>}
        </>
    )
};

export default CastDetails;