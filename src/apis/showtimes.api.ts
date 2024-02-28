import { Product } from "../types/movie.type";
import { Showtimes, Times } from "../types/showtimes.type";
import { SuccessResponse } from "../types/utils.type";
import http from "../utils/http";

const URL = "unauth/showtime";

const showtimesApi = {
  getShowtimesByDate(params: { theater_id: string; time: string }) {
    return http.get<SuccessResponse<Product[]>>(`${URL}/times`, {
      params: params,
    });
  },
  getShowtimesById(id: string) {
    return http.get<SuccessResponse<Showtimes>>(`${URL}/${id}/seats`);
  },
  getShowtimesByMovie(params: { theater_id: string; movie_id: string }) {
    return http.get<SuccessResponse<Times[]>>(`${URL}/time-by-movie`, {
      params: params,
    });
  },
};

export default showtimesApi;
