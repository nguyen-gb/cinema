import axios, { AxiosError } from "axios";

import { DayOfWeek } from "../constants/date";
import HttpStatusCode from "../constants/httpStatusCode.enum";
import { SeatType } from "../types/seat.type";
import { ErrorResponse } from "../types/utils.type";

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error);
}

export function isAxiosUnprocessableEntityError<FormError>(
  error: unknown
): error is AxiosError<FormError> {
  return (
    isAxiosError(error) &&
    error.response?.status === HttpStatusCode.UnprocessableEntity
  );
}

export function isAxiosUnauthorizedError<UnauthorizedError>(
  error: unknown
): error is AxiosError<UnauthorizedError> {
  return (
    isAxiosError(error) &&
    error.response?.status === HttpStatusCode.Unauthorized
  );
}

export function isAxiosExpiredTokenError<UnauthorizedError>(
  error: unknown
): error is AxiosError<UnauthorizedError> {
  return (
    isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(
      error
    ) && error.response?.data.message === "jwt expired"
  );
}

export function formatCurrency(currency: number) {
  return new Intl.NumberFormat("de-DE").format(currency);
}

export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  })
    .format(value)
    .replace(".", ",")
    .toLowerCase();
}

export function formatDateToString(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

export function formatDateToStringWithTime(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const formattedDateTime = `${hours}:${minutes} ${year}-${month}-${day}`;
  return formattedDateTime;
}

export const rateSale = (original: number, sale: number) =>
  Math.round(((original - sale) / original) * 100) + "%";

export const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    ""
  );

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, "-") + `@${id}`;
};

export const getIdFromMovieId = (nameId: string) => {
  const arr = nameId.split("@");
  return arr[arr.length - 1];
};

export const isTodayShowTime = (date: string) => {
  const [month, day, year] = date.split("/");
  const dateFormat = new Date(`${year}-${month}-${day}`);
  const currentDate = new Date();
  const targetDate = new Date(dateFormat);
  if (
    currentDate.getDate() === targetDate.getDate() &&
    currentDate.getMonth() === targetDate.getMonth() &&
    currentDate.getFullYear() === targetDate.getFullYear()
  ) {
    return true;
  } else {
    return false;
  }
};

export const formatShowTime = (date: string) => {
  const [month, day, year] = date.split("/");
  const dateFormat = new Date(`${year}-${month}-${day}`);
  return dateFormat;
};

export function getCurrentDayOfWeek(): DayOfWeek {
  return new Date().getDay() as DayOfWeek;
}

export function calculateTicketPrice(seatType: SeatType): number {
  const format = "2D";

  const dayOfWeek = getCurrentDayOfWeek();

  const regularSeatPrices = {
    0: 80000,
    1: format === "2D" ? 60000 : 70000,
    2: format === "2D" ? 55000 : 60000,
    3: format === "2D" ? 60000 : 70000,
    4: format === "2D" ? 60000 : 70000,
    5: 80000,
    6: 80000,
  };

  const doubleSeatPrices = {
    0: format === "2D" ? 175000 : 180000,
    1: format === "2D" ? 135000 : 160000,
    2: format === "2D" ? 120000 : 140000,
    3: format === "2D" ? 135000 : 160000,
    4: format === "2D" ? 135000 : 160000,
    5: format === "2D" ? 175000 : 180000,
    6: format === "2D" ? 175000 : 180000,
  };

  if (seatType === SeatType.single_chair) {
    return regularSeatPrices[dayOfWeek];
  } else if (seatType === SeatType.double_chair) {
    return doubleSeatPrices[dayOfWeek];
  } else {
    throw new Error("Invalid seat type");
  }
}
