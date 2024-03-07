import { Movie } from "../types/movie.type";
import { Showtimes, Times } from "../types/showtimestype";
import { SuccessResponse } from "../types/utils.type";
import http from "../utils/http";

const URL = "unauth/showtime";

const showtimeApi = {
  getShowtimesByDate(params: { theater_id: string; time: string }) {
    return http.get<SuccessResponse<Movie[]>>(`${URL}/times`, {
      params: params,
    });
  },
  getShowtimesById(id: string) {
    return http.get<SuccessResponse<Showtimes>>(`${URL}/${id}/seats`);
  },
  getShowtimesByMovie(params: { theater_id?: string; movie_id?: string }) {
    return http.get<SuccessResponse<Times[]>>(`${URL}/time-by-movie`, {
      params: params,
    });
  },
};

export default showtimeApi;
