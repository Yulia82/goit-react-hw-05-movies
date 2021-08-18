import { Route, useParams, useRouteMatch } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import { moviesList } from "../index.js";
import DetailsMovie from "../components/DetailsMovie/DetailsMovie";
import Loading from "../components/Loader/Loader";

const Reviews = lazy(() =>
  import(
    "../components/Reviews/Reviews" /* webpackChunkName: "reviews-component" */
  ),
);

const Cast = lazy(() =>
  import("../components/Cast/Cast" /* webpackChunkName: "cast-component" */),
);

export default function MovieDetailsPage() {
  // const location = useLocation();
  // console.log('Movie Details Page', location);
  const { movieId } = useParams();
  const { path } = useRouteMatch();

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    moviesList.id = Number(movieId);

    moviesList
      .getMovieId()
      .then(dataMovie => {
        // console.log(('Trending film from USEEFFECT', dataMovie));
        setMovie(dataMovie);
      })
      .catch(error => {
        alert(error.message);
      });
  }, [movieId]);

  return (
    <>
      {movie && <DetailsMovie movie={movie} />}

      <Suspense fallback={<Loading />}>
        <Route path={`${path}/reviews`}>
          <Reviews />
        </Route>

        <Route path={`${path}/cast`}>
          <Cast />
        </Route>
      </Suspense>
    </>
  );
}
