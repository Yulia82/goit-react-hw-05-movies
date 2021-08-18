import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";
// import 'modern-normalize/modern-normalize.css';
import { BrowserRouter } from "react-router-dom";
import MoviesApi from "./utils/movies-api";

export const moviesList = new MoviesApi();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root"),
);
