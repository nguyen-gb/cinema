import { ConfirmPaymentRes } from 'src/types/payment.type'
import { User } from 'src/types/user.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

export const USER_URL = 'auth/user'

const userApi = {
  getProfile(id: string) {
    return http.get<SuccessResponse<User>>(`${USER_URL}/${id}`)
  },
  updateUser(_id: string, body: Omit<User, '_id'>) {
    return http.post(`${USER_URL}/${_id}/update`, body)
  },
  getHistoryBooking(id: string) {
    return http.get<SuccessResponse<ConfirmPaymentRes[]>>(`auth/booking/${id}/user`)
  },
  changePassword(body: { password: string; new_password: string; confirm_password: string }) {
    return http.post(`auth/user/change-password`, body)
  }
}

export default userApi
