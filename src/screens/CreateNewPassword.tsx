import { useNavigation } from "@react-navigation/native";
import React, { FC, useState } from "react";

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

const CreateNewPasswordScreen: FC = () => {
  const navigation = useNavigation<any>();
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log("Password:", password);
    navigation.navigate("Login");
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="never">
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
