import { useNavigation, useRoute } from "@react-navigation/native";
import React, { FC, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import {
  View,
  ScrollView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
} from "react-native";
import Toast from "react-native-toast-message";
import authApi from "apis/auth.api";
import { isAxiosUnprocessableEntityError } from "utils/utils";
import { ErrorResponse } from "types/utils.type";

const dimensions = Dimensions.get("window");
const statusBarHeight = StatusBar?.currentHeight ?? 0;
const screen = dimensions.height + statusBarHeight + 15;

const CreateNewPasswordScreen: FC = () => {
  const { params } = useRoute();
  const navigation = useNavigation<any>();
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const forgotPassMutation = useMutation({
    mutationFn: (body: {
      user_id: string;
      otp: string;
      password: string;
      confirm_password: string;
    }) => authApi.forgotPassConfirm(body),
  });

  const handleSubmit = () => {
    if (!otp) {
      Toast.show({
        type: "error",
        text1: "Please enter your OTP to continue!",
      });
      return;
    }
    if (!password) {
      Toast.show({
        type: "error",
        text1: "Please enter your password to continue!",
      });
      return;
    }
    if (!confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Please enter your confirm password to continue!",
      });
      return;
    }
    if (confirmPassword !== password) {
      Toast.show({
        type: "error",
        text1: "Confirm password doesn't match your password!",
      });
      return;
    }

    const body = {
      user_id: (params as any).userId,
      otp: otp,
      password: password,
      confirm_password: confirmPassword,
    };
    forgotPassMutation.mutate(body, {
      onSuccess: () => {
        navigation.navigate("Login");
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
            Create a new password
          </Text>
          <TextInput
            className="px-[16px] py-[12px] border-[#F4F4F4] border rounded-lg mb-[20px]"
            placeholder="OTP"
            onChangeText={(text) => setOtp(text)}
            value={otp}
            secureTextEntry={true}
          />
          <TextInput
            className="px-[16px] py-[12px] border-[#F4F4F4] border rounded-lg mb-[20px]"
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
          />
          <TextInput
            className="px-[16px] py-[12px] border-[#F4F4F4] border rounded-lg mb-[20px]"
            placeholder="Confirm password"
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
            secureTextEntry={true}
          />
          <TouchableOpacity
            className="px-[16px] py-[12px] bg-[#AE1F17] rounded-lg mb-[24px]"
            onPress={handleSubmit}
          >
            <Text className="text-center text-[16px] font-semibold text-white">
              Continue
            </Text>
          </TouchableOpacity>
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

export default CreateNewPasswordScreen;

const styles = StyleSheet.create({
  container: {
    minHeight: screen,
  },
});
