import { useParams } from "react-router-dom";
import { MovieReviewsURL } from "../utils/APILinks";
import { fetchData } from "../utils/TmdbAPITools";
import { useEffect, useState } from "react";
import { ReviewInterface } from "../interfaces/ReviewInterface";
import css from './Reviews.module.css'

const Review = () => {
    const [reviews, setReviews] = useState<ReviewInterface[]>([]);
    const [loading, setLoading] = useState(true);
    const { movieId } = useParams();

    useEffect(() => {
        setLoading(true);
        fetchData(MovieReviewsURL(movieId)).then(response => {
            setReviews(response.results);
        }).catch(error => {
            error.log(error.message);
        }).finally(() => {
            setLoading(false);
        });   
    }, [movieId]);

    return (
        <>
            {loading && <p>Loading...</p>}
            {!loading && reviews.length > 0 && 
                <ul className={css.reviewList}>
                    {reviews.map(review => (
                        <li key={review.id} className={css.reviewListItem}>
                            <div className={css.reviewHeader}>
                                <h3>Author: {review.author}</h3>
                                <p>Rating: {review.author_details.rating}</p>
                                <p>Created at: {new Date(review.created_at).toLocaleDateString()}</p>
                            </div>
                            <p className={css.reviewContent}>{review.content}</p>
                        </li>
                    ))}
                </ul> 
            }
            {!loading && reviews.length === 0 && <p>Sorry, there are no reviews yet.</p>}
        </>
    );
};

export default Review;
