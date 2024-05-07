import { UserReview } from "types/user.type";
import { Genre, Movie, MovieListConfig } from "../types/movie.type";
import {
  Params,
  ReviewSuccessResponse,
  SuccessResponse,
} from "../types/utils.type";
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
  getMovieReview(id: string, params: Params) {
    return http.get<ReviewSuccessResponse<UserReview[]>>(
      `unauth/review/${id}/movie`,
      {
        params: params,
      }
    );
  },
  getGenres() {
    return http.get<SuccessResponse<Genre[]>>(`unauth/genre`);
  },
};

export default movieApi;
