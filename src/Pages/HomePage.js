import { moviesList } from "../index.js";
import { useState, useEffect } from "react";
import { useRouteMatch, Redirect } from "react-router-dom";
import CardList from "../components/CardList/CardList";
import { toast } from "react-toastify";

export default function HomePage() {
  const [movies, setMovies] = useState(null);

  const { isExact } = useRouteMatch();
  // const history = useHistory();

  useEffect(() => {
    if (!isExact) {
      // history.push("/");
      <Redirect to="/" />;
      toast.error("Page not found", {
        position: "top-center",
        autoClose: 3000,
      });
    }

    moviesList
      .getMoviesTrending()
      .then(({ results }) => {
        // console.log(('Trending film from USEEFFECT', results));
        setMovies(results);
      })
      .catch(error => {
        alert(error.message);
      });
  }, [isExact]);

  return <>{movies && <CardList movies={movies} />}</>;
}
