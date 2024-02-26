import { ConfirmPaymentRes, PaymentParams } from './../types/payment.type'
import http from 'src/utils/http'
import { SuccessResponse } from 'src/types/utils.type'

const URL = 'auth/payment'

const paymentApi = {
  createPaymentUrl(body: { booking_id: string }) {
    return http.post<SuccessResponse<string>>(`${URL}/create-payment-url`, body)
  },
  confirmPayment(params: PaymentParams) {
    return http.get<SuccessResponse<ConfirmPaymentRes>>(`${URL}/booking-confirm`, {
      params: params
    })
  }
}

export default paymentApi
