export interface Seat {
  _id?: string
  seat_number: string | number
  seat_type: number | string
  status?: number
  price?: number
}

export enum SeatType {
  single_chair = 0,
  double_chair = 1
}
