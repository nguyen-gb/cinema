import { useNavigation } from "@react-navigation/native";
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
  StatusBar,
  StyleSheet,
} from "react-native";
import Toast from "react-native-toast-message";
import authApi from "apis/auth.api";
import { isAxiosUnprocessableEntityError } from "utils/utils";
import { ErrorResponse } from "types/utils.type";

const dimensions = Dimensions.get("window");
const statusBarHeight = StatusBar?.currentHeight ?? 0;
const screen = dimensions.height + statusBarHeight + 15;

const RegisterScreen: FC = () => {
  const navigation = useNavigation<any>();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerAccountMutation = useMutation({
    mutationFn: (body: {
      name: string;
      email: string;
      phone: string;
      password: string;
      confirm_password: string;
    }) => authApi.registerAccount(body),
  });

  const handleSubmit = () => {
    if (!fullname) {
      Toast.show({
        type: "error",
        text1: "Please enter your full name to continue!",
      });
      return;
    }
    if (!email) {
      Toast.show({
        type: "error",
        text1: "Please enter your email to continue!",
      });
      return;
    }
    if (!phone) {
      Toast.show({
        type: "error",
        text1: "Please enter your phone to continue!",
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
      name: fullname,
      email: email,
      phone: phone,
      password: password,
      confirm_password: confirmPassword,
    };
    registerAccountMutation.mutate(body, {
      onSuccess: (res) => {
        navigation.navigate("ConfirmRegister", { userId: res.data.data._id });
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
            Create CGV account
          </Text>
          <TextInput
            className="px-[16px] py-[12px] border-[#F4F4F4] border rounded-lg mb-[12px]"
            placeholder="Full name"
            onChangeText={(text) => setFullname(text)}
            value={fullname}
          />
          <TextInput
            className="px-[16px] py-[12px] border-[#F4F4F4] border rounded-lg mb-[12px]"
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <TextInput
            className="px-[16px] py-[12px] border-[#F4F4F4] border rounded-lg mb-[12px]"
            placeholder="Phone"
            onChangeText={(text) => setPhone(text)}
            value={phone}
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
          <Text className="text-center text-[#6F767E] text-[14px] mb-[24px]">
            By continuting, I agree to CGV’s{" "}
            <Text className="text-black font-bold">Privancy Policy</Text> and{" "}
            <Text className="text-black font-bold">Term of Use</Text>.
          </Text>
          <View>
            <Text className="text-center text-[#6F767E] text-[14px] font-normal">
              Do you already have an account?
              <Text
                className="text-[#AE1F17] text-[16px] font-semibold"
                onPress={() =>
                  navigation.navigate("Login", { isGoBack: false })
                }
              >
                {" "}
                Login
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    minHeight: screen,
  },
});
