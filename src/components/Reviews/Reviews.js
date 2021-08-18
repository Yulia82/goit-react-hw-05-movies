import { moviesList } from "../../index.js";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Reviews.module.css";

const Status = {
  IDLE: "idle",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

export default function Reviews() {
  const { movieId } = useParams();

  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    moviesList.id = Number(movieId);

    moviesList
      .getReviews()
      .then(({ results }) => {
        // console.log(('Trending film from USEEFFECT', results));
        setReviews(results);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [movieId]);

  if (status === "idle") {
    return null;
  }

  if (status === "rejected") {
    return <p>{error.message}</p>;
  }

  if (status === "resolved") {
    if (reviews.length === 0) {
      return <p className={styles.Text}>Reviews not found</p>;
    } else {
      return (
        <ul className={styles.List}>
          {reviews.map(review => {
            return (
              <li key={review.author}>
                <p className={styles.Autor}>
                  {review.author} {review["updated_at"].slice(0, 10)}
                </p>
                <p>{review.content}</p>
              </li>
            );
          })}
        </ul>
      );
    }
  }
}
