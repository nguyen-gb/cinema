import { useNavigation, useRoute } from "@react-navigation/native";
import React, { FC, useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import {
  View,
  ScrollView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Dimensions,
} from "react-native";
import Toast from "react-native-toast-message";
import authApi from "apis/auth.api";
import { isAxiosUnprocessableEntityError } from "utils/utils";
import { ErrorResponse } from "types/utils.type";
import { AppContext } from "contexts/app.context";

const dimensions = Dimensions.get("window");
const statusBarHeight = StatusBar?.currentHeight ?? 0;
const screen = dimensions.height + statusBarHeight + 15;

const LoginScreen: FC = () => {
  const { isGoBack } = useRoute().params as any;
  const { setIsAuthenticated, setProfile } = useContext(AppContext);
  const navigation = useNavigation<any>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useMutation({
    mutationFn: (body: { email: string; password: string }) =>
      authApi.login(body),
  });

  const handleSubmit = () => {
    if (!username) {
      Toast.show({
        type: "error",
        text1: "Please enter your email to log in!",
      });
      return;
    }
    if (!password) {
      Toast.show({
        type: "error",
        text1: "Please enter your password to log in!",
      });
      return;
    }

    const body = {
      email: username,
      password: password,
    };

    loginMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true);
        setProfile(data.data.data.user);
        if (isGoBack) {
          navigation.goBack();
        } else {
          navigation.navigate("Home");
        }
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
          const message = error.response?.data.message;
          Toast.show({
            type: "error",
            text1: message,
          });
        }
      },
    });
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="never">
      <ExpoStatusBar style="light" />
      <View className="min-h-screen bg-white" style={styles.container}>
        <View className="border-y-4 border-b-black">
          <Image
            className="w-full"
            source={require("../assets/banner_login.png")}
          />
        </View>
        <View className="px-[16px] py-[23px]">
          <Text className="text-[20px] font-semibold mb-[24px]">
            Welcome to CGV
          </Text>
          <TextInput
            className="px-[16px] py-[12px] border-[#F4F4F4] border rounded-lg mb-[12px]"
            placeholder="Email"
            onChangeText={(text) => setUsername(text)}
            value={username}
          />
          <TextInput
            className="px-[16px] py-[12px] border-[#F4F4F4] border rounded-lg mb-[20px]"
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
          />
          <TouchableOpacity
            className="px-[16px] py-[12px] bg-[#AE1F17] rounded-lg mb-[24px]"
            onPress={handleSubmit}
          >
            <Text className="text-center text-[16px] font-semibold text-white">
              Login
            </Text>
          </TouchableOpacity>
          <Text
            className="text-center text-[#6F767E] text-[14px] font-medium underline mb-[24px]"
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            Reset password?
          </Text>
          <View>
            <Text className="text-center text-[#6F767E] text-[14px] font-normal">
              You are not a member of CGV yet?
              <Text
                className="text-[#AE1F17] text-[16px] font-semibold"
                onPress={() => navigation.navigate("Register")}
              >
                {" "}
                Sign up
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    minHeight: screen,
  },
});
