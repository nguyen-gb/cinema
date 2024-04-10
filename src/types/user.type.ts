// type Role = 'User' | 'Admin'

export interface User {
  _id: string;
  name: string;
  phone: string;
  email: string;
  date_of_birth?: string;
  gender?: string;
}

export interface Review {
  booking_id: string;
  movie_id: string;
  rating: number;
  review: string;
}

export interface UserReview {
  user_id: string;
  rating: number;
  review: string;
  user_name: string;
}
