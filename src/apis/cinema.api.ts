import { Cinema } from "../types/cinema.type";
import { SuccessResponse } from "../types/utils.type";
import http from "../utils/http";

const URL = "unauth/theater";

const cinemaApi = {
  getCinemas() {
    return http.get<SuccessResponse<Cinema[]>>(URL);
  },
};

export default cinemaApi;
