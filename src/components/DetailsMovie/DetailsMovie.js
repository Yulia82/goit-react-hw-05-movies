import PropTypes from "prop-types";
import defaultImage from "../../images/default.jpg";
import styles from "./DetailsMovie.module.css";
import {
  NavLink,
  useRouteMatch,
  useLocation,
  useHistory,
} from "react-router-dom";
import Btn from "../Btn/Btn";

export default function DetailsMovie({ movie }) {
  const { url } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

  const onGoback = () => {
    history.push(location?.state?.from ?? "/");
  };

  return (
    <>
      <Btn onClick={onGoback} />

      <div className={styles.Container}>
        <img
          className={styles.DetailsMovieImg}
          src={
            movie["poster_path"]
              ? `https://image.tmdb.org/t/p/original${movie["poster_path"]}`
              : defaultImage
          }
          alt={movie["original_title"]}
          height="410"
        />
        <div className={styles.DetailsMovietxt}>
          <h2>
            {movie["original_title"]} ({movie["release_date"].slice(0, 4)})
          </h2>
          <h4 className={styles.SectionTitle}>
            User score: <span>{movie["vote_average"]}</span>
          </h4>
          <h3 className={styles.SectionTitle}>Genres</h3>
          <p>{movie.genres.map(genre => genre.name).join(", ")}</p>
          <h3 className={styles.SectionTitle}>Overview</h3>
          <p>{movie["overview"]}</p>

          <ul className={styles.List}>
            <li className={styles.Item} key="cast">
              <NavLink
                to={{
                  pathname: `${url}/cast`,
                  state: { from: location.state.from },
                }}
              >
                Cast
              </NavLink>
            </li>

            <li className={styles.Item} key="reviews">
              <NavLink
                to={{
                  pathname: `${url}/reviews`,
                  state: { from: location.state.from },
                }}
              >
                Reviews
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

DetailsMovie.propTypes = {
  movie: PropTypes.object.isRequired,
};
