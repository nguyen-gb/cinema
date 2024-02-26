import { Booking, BookingDetail } from "./../types/booking.type";
import { SuccessResponse } from "../types/utils.type";
import http from "../utils/http";

const URL = "auth/booking";

const bookingApi = {
  createBooking(body: Booking) {
    return http.post<SuccessResponse<BookingDetail>>(URL, body);
  },
  getBookingDetail(id: string) {
    return http.get<SuccessResponse<BookingDetail>>(`${URL}/${id}`);
  },
};

export default bookingApi;
