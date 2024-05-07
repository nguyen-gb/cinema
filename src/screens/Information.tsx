import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ChevronLeftIcon,
  InformationCircleIcon,
  LockClosedIcon,
  StarIcon,
} from "react-native-heroicons/outline";
import { useMutation } from "@tanstack/react-query";

import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { AppContext } from "contexts/app.context";
import { User } from "types/user.type";
import userApi from "apis/user.api";
import { isAxiosUnprocessableEntityError } from "utils/utils";
import { ErrorResponse } from "types/utils.type";
import Toast from "react-native-toast-message";
import { setProfileToLS } from "utils/auth";

export default function InformationScreen() {
  const { profile, setProfile } = useContext(AppContext);
  const navigation = useNavigation<any>();

  const [fullname, setFullname] = useState(profile?.name);
  const [email, setEmail] = useState(profile?.email);
  const [phone, setPhone] = useState(profile?.phone);

  const updateMutation = useMutation({
    mutationFn: (body: Omit<User, "_id">) =>
      userApi.updateUser(profile?._id as string, body),
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

    const body = {
      name: fullname,
      email: email,
      phone: phone,
    };
    updateMutation.mutate(body, {
      onSuccess: (data) => {
        setProfile(data.data.data);
        setProfileToLS(data.data.data);
        Toast.show({
          type: "success",
          text1: data.data.message,
        });
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
    <View className="flex-1 bg-white">
      <View className="w-full py-3">
        <SafeAreaView className="z-20 w-full flex flex-row justify-start items-center px-4">
          <TouchableOpacity
            className="mr-2"
            onPress={() => navigation.goBack()}
          >
            <ChevronLeftIcon size="28" strokeWidth={2.5} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold">My Account</Text>
        </SafeAreaView>
      </View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        className="flex-1 w-full"
      >
        <View className="px-[16px]">
          <View className="w-full flex-col justify-center items-center bg-secondary mt-[50px] mb-5 rounded-[20px]">
            <Image
              className="-mt-[35px] mb-2"
              source={require("../assets/avatar_drawer.png")}
            />
            <Text className="text-base font-semibold text-white">
              {profile?.name ?? "-"}
            </Text>
            <View className="w-full flex-row justify-between items-center p-[24px]">
              <TouchableOpacity
                onPress={() => navigation.navigate("Information")}
                className="w-[100px] flex-col items-center justify-between"
              >
                <View className="w-[36px] h-[36px] rounded-full bg-blue-300 flex justify-center items-center mb-2">
                  <InformationCircleIcon
                    size="20"
                    strokeWidth={1.5}
                    color="blue"
                  />
                </View>
                <Text className="text-xs text-white">Information</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("ChangePassword")}
                className="w-[100px] flex-col items-center justify-between"
              >
                <View className="w-[36px] h-[36px] rounded-full bg-red-300 flex justify-center items-center mb-2">
                  <LockClosedIcon size="20" strokeWidth={1.5} color="red" />
                </View>
                <Text className="text-xs text-white">Change password</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("PurchaseHistory", { now: Date.now() })
                }
                className="w-[100px] flex-col items-center justify-between"
              >
                <View className="w-[36px] h-[36px] rounded-full bg-green-300 flex justify-center items-center mb-2">
                  <StarIcon size="20" strokeWidth={1.5} color="green" />
                </View>
                <Text className="text-xs text-white">Purchase History</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text className="text-[20px] font-semibold mb-[12px]">
            Information
          </Text>
          <TextInput
            className="px-[16px] py-[12px] border-[#F4F4F4] border rounded-lg mb-[12px]"
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            editable={false}
          />
          <TextInput
            className="px-[16px] py-[12px] border-[#F4F4F4] border rounded-lg mb-[12px]"
            placeholder="Full name"
            onChangeText={(text) => setFullname(text)}
            value={fullname}
          />
          <TextInput
            className="px-[16px] py-[12px] border-[#F4F4F4] border rounded-lg mb-[12px]"
            placeholder="Phone"
            onChangeText={(text) => setPhone(text)}
            value={phone}
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={handleSubmit}
        className="fixed bottom-0 px-[16px] py-[12px] bg-[#AE1F17] rounded-lg mx-4 my-4"
      >
        <Text className="text-center text-[16px] font-semibold text-white">
          Save
        </Text>
      </TouchableOpacity>
    </View>
  );
}
