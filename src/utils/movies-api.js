const BASICURL = "https://api.themoviedb.org/3/";
const KEY = "269fc72459681d39c03aa9c239bf3670";

export default class MoviesApi {
  constructor() {
    this.searchQuery = "";
    this.searchId = null;
    this.currentPage = 1;
  }

  async getMoviesTrending() {
    const response = await fetch(
      `${BASICURL}trending/movie/day?api_key=${KEY}&page=${this.currentPage}`,
    );

    if (response.ok) {
      return await response.json();
    }

    return Promise.reject(new Error(`Not found movies`));
  }

  async getSearchMovies() {
    const response = await fetch(
      `${BASICURL}search/movie?api_key=${KEY}&language=en-US&query=${this.searchQuery}&page=${this.currentPage}&include_adult=false`,
    );

    if (response.ok) {
      return await response.json();
    }

    return Promise.reject(new Error(`Not found movies`));
  }

  async getMovieId() {
    const response = await fetch(
      `${BASICURL}movie/${this.searchId}?api_key=${KEY}&language=en-US`,
    );
    // https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US

    if (response.ok) {
      return await response.json();
    }

    return Promise.reject(new Error(`Not found movies`));
  }

  async getReviews() {
    const response = await fetch(
      `${BASICURL}movie/${this.searchId}/reviews?api_key=${KEY}&language=en-US&page=1`,
    );
    // https://api.themoviedb.org/3/movie/{movie_id}/reviews?api_key=<<api_key>>&language=en-US&page=1

    if (response.ok) {
      return await response.json();
    }

    return Promise.reject(new Error(`Not found infirmation`));
  }

  async getCast() {
    const response = await fetch(
      `${BASICURL}movie/${this.searchId}/credits?api_key=${KEY}&language=en-US`,
    );
    // https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>&language=en-US

    if (response.ok) {
      return await response.json();
    }

    return Promise.reject(new Error(`Not found infirmation`));
  }

  async getGenres() {
    const response = await fetch(
      `${BASICURL}genre/movie/list?api_key=${KEY}&language=en-US`,
    );
    // https://api.themoviedb.org/3/genre/movie/list?api_key=${KEY}&language=en-US

    if (response.ok) {
      return await response.json();
    }

    return Promise.reject(new Error(`Not found infirmation`));
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  set id(newId) {
    this.searchId = newId;
  }

  //   get query() {
  //     return this.searchQuery;
  //   }
}
