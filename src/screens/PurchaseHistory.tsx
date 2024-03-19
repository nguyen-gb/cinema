import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ChevronLeftIcon,
  InformationCircleIcon,
  LockClosedIcon,
  StarIcon,
} from "react-native-heroicons/outline";
import { useQuery } from "@tanstack/react-query";

import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { AppContext } from "contexts/app.context";
import userApi from "apis/user.api";
import { formatCurrency } from "utils/utils";

export default function PurchaseHistoryScreen() {
  const { profile } = useContext(AppContext);
  const navigation = useNavigation<any>();

  const { data: hisBookingsData } = useQuery({
    queryKey: ["purchases", profile?._id],
    queryFn: () => userApi.getHistoryBooking(profile?._id as string),
  });

  const hisBookings = hisBookingsData?.data.data;
  console.log(hisBookings);

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
          <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 15 }}
          >
            <View className="w-full flex-col justify-center items-center">
              {hisBookings?.map((booking) => (
                <View className="w-full flex-row items-center p-4 border-gray-500 border rounded-xl mb-2">
                  {booking.payment_status === 1 ? (
                    <Text className="text-[#38B000] text-2xl font-medium px-[25px]">
                      Paid
                    </Text>
                  ) : (
                    <Text className="text-[#F87C7A] text-2xl font-medium px-[25px]">
                      Unpaid
                    </Text>
                  )}
                  <View className="flex-col">
                    <Text className="text-base font-medium">
                      {booking.movie_name.length > 50
                        ? booking.movie_name.slice(0, 50) + "..."
                        : booking.movie_name}
                    </Text>
                    <Text className="text-sm text-[#646464]">
                      Cinema:{" "}
                      {booking.theater_name.length > 40
                        ? booking.theater_name.slice(0, 40) + "..."
                        : booking.theater_name}
                    </Text>
                    <Text className="text-sm text-[#646464]">
                      Number of ticket: {booking.seats.length}
                    </Text>
                    <Text className="text-sm text-[#646464]">
                      Total: {formatCurrency(booking.total_amount)}VND
                    </Text>
                    <View className="flex-row items-center max-w-[200px] text-right">
                      <Text className="text-base font-medium">
                        {booking?.showtime}
                      </Text>
                      <Text className="text-base font-medium"> - </Text>
                      <Text className="text-base font-medium">
                        {booking?.time}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}
