import { ConfirmPaymentRes } from "../types/payment.type";
import { Review, User } from "../types/user.type";
import { SuccessResponse } from "../types/utils.type";
import http from "../utils/http";

export const USER_URL = "auth/user";

const userApi = {
  getProfile(id: string) {
    return http.get<SuccessResponse<User>>(`${USER_URL}/${id}`);
  },
  updateUser(_id: string, body: Omit<User, "_id">) {
    return http.post(`${USER_URL}/${_id}/update`, body);
  },
  getHistoryBooking(id: string) {
    return http.get<SuccessResponse<ConfirmPaymentRes[]>>(
      `auth/booking/${id}/user`
    );
  },
  changePassword(body: {
    password: string;
    new_password: string;
    confirm_password: string;
  }) {
    return http.post(`auth/user/change-password`, body);
  },
  reviewMovie(body: Review) {
    return http.post(`auth/review`, body);
  },
};

export default userApi;
