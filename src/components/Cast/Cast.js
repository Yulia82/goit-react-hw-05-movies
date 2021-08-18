import { moviesList } from "../../index.js";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../Loader/Loader";
import styles from "./Cast.module.css";
import defaultImage from "../../images/default.jpg";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

export default function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    setStatus(Status.PENDING);

    moviesList.id = Number(movieId);

    moviesList
      .getCast()
      .then(({ cast }) => {
        // console.log(('CAST', cast));
        setCast(cast);
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

  if (status === "pending") {
    return <Loading />;
  }

  if (status === "rejected") {
    return <p>{error.message}</p>;
  }

  if (status === "resolved") {
    if (cast.length === 0) {
      return <p>Cast not found</p>;
    } else {
      return (
        <ul className={styles.List}>
          {cast.map(actorProfile => {
            return (
              <li className={styles.ListItem} key={actorProfile.id}>
                <div className={styles.Thumb}>
                  <img
                    className={styles.Image}
                    src={
                      actorProfile["profile_path"]
                        ? `https://image.tmdb.org/t/p/original${actorProfile["profile_path"]}`
                        : defaultImage
                    }
                    alt={actorProfile.name}
                  />
                </div>
                <p className={styles.Name}>{actorProfile.name}</p>
              </li>
            );
          })}
        </ul>
      );
    }
  }
}
