import { Movie, MovieListConfig } from "../types/movie.type";
import { SuccessResponse } from "../types/utils.type";
import http from "../utils/http";

const URL = "unauth/movie";

const movieApi = {
  getMovies(params: MovieListConfig) {
    return http.get<SuccessResponse<Movie[]>>(URL, {
      params: params,
    });
  },
  getMovieDetail(id: string) {
    return http.get<SuccessResponse<Movie>>(`${URL}/${id}`);
  },
  getMostMovies() {
    return http.get<SuccessResponse<Movie[]>>(`${URL}/most-view`);
  },
};

export default movieApi;
