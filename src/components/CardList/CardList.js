import PropTypes from "prop-types";
import CardMovie from "../CardMovie/CardMovie";
import styles from "./CardList.module.css";

export default function CardList({ movies }) {
  return (
    <ul className={styles.CardList}>
      {movies.map(movie => {
        return (
          <li className={styles.ListItem} key={movie.id}>
            <CardMovie
              id={movie.id}
              src={movie["poster_path"]}
              title={movie["original_title"]}
              genresIds={movie["genre_ids"]}
              data={movie["release_date"]}
            />
          </li>
        );
      })}
    </ul>
  );
}

CardList.propTypes = {
  movies: PropTypes.array.isRequired,
};
