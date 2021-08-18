import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import CardList from "../components/CardList/CardList";
import Searchbar from "../components/Searchbar/Searchbar";
import { moviesList } from "../index.js";
import Loading from "../components/Loader/Loader";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

export default function MoviesPage() {
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  const history = useHistory();
  const location = useLocation();
  // console.log('history', history);
  // console.log('location', location);

  const queryUrl = new URLSearchParams(location.search).get("query");

  const onSubmit = query => {
    history.push({ ...location, search: `query=${query}` });
  };

  useEffect(() => {
    if (!queryUrl) {
      return;
    }

    setStatus(Status.PENDING);

    moviesList.query = queryUrl;

    moviesList
      .getSearchMovies()
      .then(({ results }) => {
        // console.log(('Trending film from USEEFFECT', results));
        setMovies(results);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [queryUrl]);

  if (status === "idle") {
    return <Searchbar onSubmit={onSubmit} />;
  }

  if (status === "pending") {
    return <Loading />;
  }

  if (status === "rejected") {
    return <p>{error.message}</p>;
  }

  if (status === "resolved") {
    if (movies.length === 0) {
      return (
        <>
          <Searchbar onSubmit={onSubmit} />
          <p>Movies not found</p>
        </>
      );
    } else {
      return (
        <>
          <Searchbar onSubmit={onSubmit} />
          <CardList movies={movies} />
        </>
      );
    }
  }
}
