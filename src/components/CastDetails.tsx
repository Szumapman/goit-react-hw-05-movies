import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../utils/TmdbAPITools";
import { CastInterface } from "../interfaces/CastInterface";
import { MovieCreditsURL } from "../utils/APILinks";
import { CastPhotoURL } from "../utils/APILinks";
import noPhoto from "../assets/images/no_photo.jpg";

const CastDetails = () => {
    const [cast, setCast] = useState<CastInterface[]>([]);
    const { movieId } = useParams();

    useEffect(() => {
        fetchData(MovieCreditsURL(movieId)).then(response => {
            setCast(response.cast);
        }).catch(error => {
            console.log(error);
        })
    }, [movieId]);

    return (
        <>
            <ul>
                {cast.map(({id, profile_path, name, character}) => (
                    <li key={id}>
                        <img src={profile_path ? CastPhotoURL(profile_path) : noPhoto} alt={profile_path ? `${name} photo` : `replacement image for ${name}`} />
                        <p>{name}</p>
                        <p>Character: {character}</p>
                    </li>
                ))}
            </ul>
        </>
    )
};

export default CastDetails;