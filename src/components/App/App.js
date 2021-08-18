import { Route, Switch } from "react-router-dom";
import { lazy, Suspense } from "react";
import Header from "../Header/Header";
import Container from "../Container/Container";
import Loading from "../Loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = lazy(() =>
  import("../../Pages/HomePage" /* webpackChunkName: "home-page" */),
);

const MoviesPage = lazy(() =>
  import("../../Pages/MoviesPage" /* webpackChunkName: "movies-page" */),
);

const MovieDetailsPage = lazy(() =>
  import(
    "../../Pages/MovieDetailsPage" /* webpackChunkName: "movies-details-page" */
  ),
);

// const NotFoundPage = lazy(() =>
//   import('../../Pages/NotFoundPage' /* webpackChunkName: "not-found-page" */),
// );

function App() {
  return (
    <>
      <Container>
        <Header />

        <Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/movies" component={MoviesPage} />

            <Route path="/movies/:movieId">
              <MovieDetailsPage />
            </Route>

            {/* <Route component={NotFoundPage} /> */}
            <Route component={HomePage} />
          </Switch>
        </Suspense>
      </Container>
      <ToastContainer />
    </>
  );
}

export default App;
