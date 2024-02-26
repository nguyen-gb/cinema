import AsyncStorage from "@react-native-async-storage/async-storage";

import EventEmitter from "react-native/Libraries/vendor/emitter/EventEmitter";
import { User } from "types/user.type";

export const eventEmitter = new EventEmitter();

export const setAccessTokenToLS = async (access_token: string) => {
  try {
    await AsyncStorage.setItem("access_token", access_token);
  } catch (error) {
    console.log(error);
  }
};

export const setRefreshTokenToLS = async (refresh_token: string) => {
  try {
    await AsyncStorage.setItem("refresh_token", refresh_token);
  } catch (error) {
    console.log(error);
  }
};

export const clearLS = async () => {
  try {
    await AsyncStorage.removeItem("access_token");
    await AsyncStorage.removeItem("refresh_token");
    await AsyncStorage.removeItem("profile");
    eventEmitter.emit("clearLS");
  } catch (error) {
    console.log(error);
  }
};

export const getAccessTokenFromLS = async () => {
  try {
    const accessToken = (await AsyncStorage.getItem("access_token")) || "";
    return accessToken;
  } catch (error) {
    console.log(error);
    return "";
  }
};

export const getRefreshTokenFromLS = async () => {
  try {
    const refreshToken = (await AsyncStorage.getItem("refresh_token")) || "";
    return refreshToken;
  } catch (error) {
    console.log(error);
    return "";
  }
};

export const setProfileToLS = async (profile: User) => {
  try {
    await AsyncStorage.setItem("profile", JSON.stringify(profile));
  } catch (error) {
    console.log(error);
  }
};

export const getProfileFromLS = async () => {
  try {
    const result = await AsyncStorage.getItem("profile");
    return result ? JSON.parse(result) : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
