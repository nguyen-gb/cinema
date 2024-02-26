import { Combo } from "../types/combo.type";
import { SuccessResponse } from "../types/utils.type";
import http from "../utils/http";

const URL = "unauth/product";

const comboApi = {
  getCombos() {
    return http.get<SuccessResponse<Combo[]>>(`${URL}`);
  },
};

export default comboApi;
