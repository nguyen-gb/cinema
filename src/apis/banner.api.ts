import { Banner } from "../types/banner.type";
import { SuccessResponse } from "../types/utils.type";
import http from "../utils/http";

const URL = "unauth/banner";

const bannerApi = {
  getBanners() {
    return http.get<SuccessResponse<Banner[]>>(URL);
  },
};

export default bannerApi;
