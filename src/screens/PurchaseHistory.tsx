import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ChevronLeftIcon,
  InformationCircleIcon,
  LockClosedIcon,
  StarIcon,
} from "react-native-heroicons/outline";

import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { AppContext } from "contexts/app.context";

export default function PurchaseHistoryScreen() {
  const { profile } = useContext(AppContext);
  const navigation = useNavigation<any>();

  return (
    <View className="flex-1 bg-white">
      <View className="w-full py-3">
        <SafeAreaView className="z-20 w-full flex flex-row justify-start items-center px-4">
          <TouchableOpacity
            className="mr-2"
            onPress={() => navigation.navigate("Home")}
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
                onPress={() => navigation.navigate("PurchaseHistory")}
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
            Purchase history
          </Text>
          <View className="border-gray-700 border rounded-xl">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 15 }}
            >
              <Text>hihi</Text>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
