import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  type AxiosInstance,
} from "axios";
import Toast from "react-native-toast-message";
import HttpStatusCode from "../constants/httpStatusCode.enum";
import { AuthResponse, RefreshTokenResponse } from "../types/auth.type";
import {
  clearLS,
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
  setProfileToLS,
  setRefreshTokenToLS,
} from "./auth";
import config from "../constants/config";
import {
  URL_LOGIN,
  URL_LOGOUT,
  URL_REFRESH_TOKEN,
  URL_VERIFY,
} from "../apis/auth.api";
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from "./utils";
import { ErrorResponse } from "../types/utils.type";

export class Http {
  instance: AxiosInstance;
  private accessToken: string;
  private refreshToken: string;
  private refreshTokenRequest: Promise<string> | null;
  constructor() {
    this.accessToken = "";
    this.refreshToken = "";
    this.refreshTokenRequest = null;
    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        //'expire-access-token': 10,
        //'expire-refresh-token': 60 * 60
      },
    });
    this.init();
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken) {
          config.headers.authorization = this.accessToken;
          return config;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config;
        if (url === URL_LOGIN || url === URL_VERIFY) {
          const data = response.data as AuthResponse;
          this.accessToken = data.data.access_token;
          this.refreshToken = data.data.refresh_token;
          setAccessTokenToLS(this.accessToken);
          setRefreshTokenToLS(this.refreshToken);
          setProfileToLS(data.data.user);
        } else if (url === URL_LOGOUT) {
          this.accessToken = "";
          this.refreshToken = "";
          clearLS();
        }
        return response;
      },
      (error: AxiosError) => {
        //Chỉ toast lỗi khác 422 và 401
        if (
          ![
            HttpStatusCode.UnprocessableEntity,
            HttpStatusCode.Unauthorized,
          ].includes(error.response?.status as number)
        ) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data;
          const message = data?.message || error.message;
          Toast.show({
            type: "error",
            text1: message,
          });
        }
        //Nếu là lỗi 401
        if (
          isAxiosUnauthorizedError<
            ErrorResponse<{ name: string; message: string }>
          >(error)
        ) {
          const config =
            error.response?.config ||
            ({ headers: {} } as InternalAxiosRequestConfig);
          const { url } = config;
          //Trường hợp Token hết hạn và request đó không phải là request refresh token
          //thì chúng ta mới tiến hành gọi refresh token
          if (isAxiosExpiredTokenError(error) && url !== URL_REFRESH_TOKEN) {
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshToken().finally(() => {
                  //Giữ refreshTokenRequest trong 10s cho nhưng request tiếp theo nếu có 401 thì dùng
                  setTimeout(() => {
                    this.refreshTokenRequest = null;
                  }, 10000);
                });
            return this.refreshTokenRequest.then((access_token) => {
              //Nghĩa là gọi lại request cũ bị lỗi
              return this.instance({
                ...config,
                headers: { ...config.headers, authorization: access_token },
              });
            });
          }

          //Còn những trường hợp như token không đúng
          //không truyền token
          //refresh token hết hạn
          //thì tiến hành xoá local storage và toast message
          this.accessToken = "";
          this.refreshToken = "";
          clearLS();
          Toast.show({
            type: "error",
            text1:
              error.response?.data.data?.message ||
              error.response?.data.message,
          });

          //window.location.reload()
        }
        return Promise.reject(error);
      }
    );
  }

  private async init() {
    try {
      this.accessToken = await getAccessTokenFromLS();
      this.refreshToken = await getRefreshTokenFromLS();
    } catch (error) {
      console.error("Error initializing HTTP client:", error);
    }
  }

  private handleRefreshToken() {
    return this.instance
      .post<RefreshTokenResponse>(URL_REFRESH_TOKEN, {
        access_token: this.accessToken,
        refresh_token: this.refreshToken,
      })
      .then((res) => {
        const { access_token } = res.data.data;
        setAccessTokenToLS(access_token);
        this.accessToken = access_token;
        return access_token;
      })
      .catch((error) => {
        this.accessToken = "";
        this.refreshToken = "";
        clearLS();
        throw error;
      });
  }
}

const http = new Http().instance;

export default http;
