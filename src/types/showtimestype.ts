import { Seat } from "./seat.type";

export interface Showtimes {
  _id: string;
  room_id: string;
  room_number: string;
  movie_id: string;
  time: string;
  showtime: string;
  seat_array: Seat[];
}

export interface Showtime {
  showtime: string;
  showtime_id: string;
}

export interface TimeShowtime {
  time: string;
  showtimes: Showtime[];
}

export interface Times {
  times: TimeShowtime[];
}
