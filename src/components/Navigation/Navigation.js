import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";

export default function Navigation() {
  return (
    <ul className={styles.Navigation}>
      <li key="home" className={styles.Item}>
        <NavLink
          exact
          to="/"
          className={styles.NavLink}
          activeClassName={styles["NavLink-active"]}
        >
          Home
        </NavLink>
      </li>
      <li key="movies" className={styles.Item}>
        <NavLink
          to="/movies"
          className={styles.NavLink}
          activeClassName={styles["NavLink-active"]}
        >
          Movies
        </NavLink>
      </li>
    </ul>
  );
}
