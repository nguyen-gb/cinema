export interface ErrorResponse<Data> {
  message: string;
  data?: Data;
}

export interface SuccessResponse<Data> {
  message: string;
  data: Data;
  status?: number;
}

export interface ReviewSuccessResponse<Data> {
  message: string;
  data: Data;
  status?: number;
  total_record: number;
  total_review: string;
}

export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>;
};

export interface Params {
  page?: number;
  page_size?: number;
  key_search?: string;
  [key: string]: any;
}
