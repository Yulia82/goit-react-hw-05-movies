import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./CardMovie.module.css";
import defaultImage from "../../images/default.jpg";
import { moviesList } from "../../index.js";

export default function CardMovie({ id, src, title, genresIds, data }) {
  const [genres, setGenres] = useState(null);
  const location = useLocation();

  useEffect(() => {
    moviesList
      .getGenres()
      .then(({ genres }) => {
        // console.log(('Trending film from USEEFFECT', genres));
        setGenres(genres);
      })
      .catch(error => {
        alert(error.message);
      });
  }, []);

  return (
    <>
      <Link
        to={{
          pathname: `/movies/${id}`,
          state: { from: location },
        }}
      >
        <div className={styles.Thumb}>
          <img
            className={styles.Image}
            src={
              src ? `https://image.tmdb.org/t/p/original${src}` : defaultImage
            }
            alt={title}
          />
        </div>

        <div className={styles.Container}>
          <p className={styles.Title}>{title.toUpperCase()}</p>
          <p className={styles.Text}>
            {genres &&
              genres
                .filter(genre => genresIds.includes(genre.id))
                .map(genre => genre.name)
                .slice(0, 4)
                .join(" | ")}
          </p>
          <p className={styles.Data}>{data}</p>
        </div>
      </Link>
    </>
  );
}

CardMovie.propTypes = {
  id: PropTypes.number.isRequired,
  src: PropTypes.string,
  title: PropTypes.string.isRequired,
  data: PropTypes.string,
  genres: PropTypes.array,
};
