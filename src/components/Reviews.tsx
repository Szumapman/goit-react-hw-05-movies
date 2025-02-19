import { useParams } from "react-router-dom";
import { MovieReviewsURL } from "../utils/APILinks";
import { fetchData } from "../utils/TmdbAPITools";
import { useEffect, useState } from "react";
import { ReviewInterface } from "../interfaces/ReviewInterface";

const Review = () => {
    const [reviews, setReviews] = useState<ReviewInterface[]>([]);
    const { movieId } = useParams();

    useEffect(() => {
        fetchData(MovieReviewsURL(movieId)).then(response => {
            console.log(response);
            setReviews(response.results);
        }).catch(error => {
            console.log(error);
        });
    }, [movieId]);

    return (
        <ul>
            {reviews.map(review => (
                <li key={review.id}>
                    <h3>{review.author}</h3>
                    <p>{review.content}</p>
                </li>
            ))}
        </ul>
    );
};

export default Review;
