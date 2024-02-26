import {
  AuthResponse,
  ForgotPassConfirm,
  RegisterResponse,
} from "../types/auth.type";
import http from "../utils/http";

export const URL_REGISTER = "oauth/register";
export const URL_VERIFY = "oauth/verify";
export const URL_LOGIN = "oauth/login";
export const URL_LOGOUT = "oauth/logout";
export const URL_REFRESH_TOKEN = "oauth/refresh-token";
export const URL_FORGOT_PASS = "oauth/forgot-password";
export const URL_FORGOT_PASS_CONFIRM = "oauth/forgot-password-confirm";

const authApi = {
  registerAccount: (body: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }) => http.post<RegisterResponse>(URL_REGISTER, body),

  verify: (body: { user_id: string; otp: string }) =>
    http.post<AuthResponse>(URL_VERIFY, body),

  login: (body: { email: string; password: string }) =>
    http.post<AuthResponse>(URL_LOGIN, body),

  forgotPass: (body: { email: string }) =>
    http.post<{ data: { _id: string } }>(URL_FORGOT_PASS, body),

  forgotPassConfirm: (body: ForgotPassConfirm) =>
    http.post<AuthResponse>(URL_FORGOT_PASS_CONFIRM, body),

  logout: () => http.get(URL_LOGOUT),
};

export default authApi;
