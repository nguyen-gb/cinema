import { Combo } from "./combo.type";
import { Seat } from "./seat.type";

export interface PaymentParams {
  vnp_Amount: string;
  vnp_BankCode: string;
  vnp_BankTranNo: string;
  vnp_CardType: string;
  vnp_OrderInfo: string;
  vnp_PayDate: string;
  vnp_ResponseCode: string;
  vnp_TmnCode: string;
  vnp_TransactionNo: string;
  vnp_TransactionStatus: string;
  vnp_TxnRef: string;
  vnp_SecureHash: string;
}

export interface ConfirmPaymentRes {
  _id: string;
  room_id: string;
  room_number: string;
  payment_method: string;
  payment_status: number;
  user_id: string;
  user_name: string;
  movie_id: string;
  movie_name: string;
  seats: Seat[];
  combos: Combo[];
  time: string;
  showtime: string;
  total_amount: number;
  theater_name: string;
  format: string;
  code: string;
  reviewed: number;
  created_at: string;
}
