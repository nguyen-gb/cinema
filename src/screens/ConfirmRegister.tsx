import { useNavigation } from "@react-navigation/native";
import React, { FC, useRef, useState } from "react";

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

const dimensions = Dimensions.get("window");
const statusBarHeight = StatusBar?.currentHeight ?? 0;
const screen = dimensions.height + statusBarHeight + 15;

const ConfirmRegisterScreen: FC = () => {
  const navigation = useNavigation<any>();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputs = useRef<TextInput[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value === "") {
      inputs.current[index - 1]?.focus();
    }

    if (!parseInt(value) && value !== "") {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "") {
      if (index === otp.length - 1) {
        // Focus next input if available
      } else {
        inputs.current[index + 1]?.focus();
      }
    }
  };

  const handleSubmit = () => {
    console.log("OTP:", otp);
    navigation.navigate("Login");
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
        <View className="px-[50px] py-[23px]">
          <Text className="text-[20px] font-semibold mb-[4px]">
            Verification
          </Text>
          <Text className="text-[14px] font-normal mb-[20px]">
            We just send you a verify code. Check your inbox to get them.
          </Text>
          <View className="flex flex-row justify-between items-center gap-[10px] mb-[8px]">
            {otp.map((digit, index) => (
              <TextInput
                className="w-[20%] bg-[#EFEFEF] p-[12px] rounded-xl text-[48px] text-[#1A1D1F] font-bold text-center"
                key={index}
                keyboardType="numeric"
                maxLength={1}
                onChangeText={(value) => handleChange(index, value)}
                value={digit}
                ref={(input) => (inputs.current[index] = input as TextInput)}
              />
            ))}
          </View>
          <Text className="text-center text-[#6F767E] text-[14px] font-medium mb-[8px]">
            Didn’t receive OTP?
          </Text>
          <Text className="text-center text-[#1A1D1F] text-[16px] font-medium mb-[20px]">
            Resend OTP
          </Text>
          <TouchableOpacity
            className="px-[16px] py-[12px] bg-[#AE1F17] rounded-lg mb-[24px]"
            onPress={handleSubmit}
          >
            <Text className="text-center text-[16px] font-semibold text-white">
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ConfirmRegisterScreen;

const styles = StyleSheet.create({
  container: {
    minHeight: screen,
  },
});
