import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useQuery } from "@tanstack/react-query";

import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import * as Progress from "react-native-progress";
import bookingApi from "apis/booking.api";
import { AppContext } from "contexts/app.context";
import { seatArray } from "constants/seat";
import { formatCurrency } from "utils/utils";

export default function CheckBookingScreen() {
  const { bookingId } = useRoute().params as any;
  const [time, setTime] = useState(0);
  const [isFailed, setIsFailed] = useState(false);
  const { profile } = useContext(AppContext);
  const navigation = useNavigation<any>();

  const { data } = useQuery({
    queryKey: ["booking", bookingId, time],
    queryFn: () => bookingApi.getBookingDetail(bookingId as string),
  });
  const bookingData = data?.data.data;

  useEffect(() => {
    const interval = setInterval(() => {
      if (bookingData && bookingData.payment_status === 1) {
        clearInterval(interval);
      } else if (time < 6) {
        setTime((prevTime) => prevTime + 1);
      } else {
        clearInterval(interval);
        setIsFailed(true);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [bookingData, time, setIsFailed]);

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
          <Text className="text-xl font-semibold">Payment</Text>
        </SafeAreaView>
      </View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        className="flex-1 w-full"
      >
        {!isFailed && (!bookingData || bookingData.payment_status === 0) && (
          <View className="flex-col justify-center items-center px-[36px] py-20">
            <Image source={require("../assets/big_logo.png")} />
            <Progress.CircleSnail
              thickness={6}
              size={60}
              color="#AE1F17"
              className="my-[60px]"
            />
            <Text className="text-xl font-medium mb-[14px] text-center">
              Your payment is being processed...
            </Text>
            <Text className="text-base text-center">
              This may take a few minutes. Please do not leave this page.
            </Text>
          </View>
        )}
        {!isFailed && bookingData && bookingData.payment_status === 1 && (
          <View className="flex-col justify-center items-center px-[30px] pt-[40px]">
            <Image source={require("../assets/success_icon.png")} />
            <Text className="text-xl font-medium my-[22px] text-center">
              Payment successful!
            </Text>
            <Text className="text-base text-center mb-[40px]">
              Congratulations! Your ticket has been successfully booked. Please
              see the booking details below.
            </Text>
            <View className="w-full flex-row justify-start items-center">
              <Image
                className="mr-2"
                source={require("../assets/ticket_icon.png")}
              />
              <Text className="text-lg font-medium mb-2">
                Booking information
              </Text>
            </View>
            <View className="w-full flex-col p-4 border-gray-500 border rounded-xl">
              <View className="flex-row justify-between items-start mb-2">
                <Text className="text-base font-medium">Movie name:</Text>
                <Text className="text-[#646464] max-w-[200px] text-right">
                  {bookingData.movie_name.length > 25
                    ? bookingData.movie_name.slice(0, 25) + "..."
                    : bookingData.movie_name}
                </Text>
              </View>
              <View className="flex-row justify-between items-start mb-2">
                <Text className="text-base font-medium">Ticket purchaser:</Text>
                <Text className="text-[#646464] max-w-[200px] text-right">
                  {profile && profile?.name.length > 25
                    ? profile?.name.slice(0, 25) + "..."
                    : profile?.name}
                </Text>
              </View>
              <View className="flex-row justify-between items-start mb-2">
                <Text className="text-base font-medium">Cinema:</Text>
                <Text className="text-[#646464] max-w-[200px] text-right">
                  {bookingData.theater_name.length > 25
                    ? bookingData.theater_name.slice(0, 25) + "..."
                    : bookingData.theater_name}
                </Text>
              </View>
              <View className="flex-row justify-between items-start mb-2">
                <Text className="text-base font-medium">Room:</Text>
                <Text className="text-[#646464] max-w-[200px] text-right">
                  {bookingData.room_number.length > 25
                    ? bookingData.room_number.slice(0, 25) + "..."
                    : bookingData.room_number}
                </Text>
              </View>
              <View className="flex-row justify-between items-start mb-2">
                <Text className="text-base font-medium">Showtime:</Text>
                <View className="flex-row items-center max-w-[200px] text-right">
                  <Text className="text-[#646464]">
                    {bookingData?.showtime}
                  </Text>
                  <Text className="text-[#646464]"> - </Text>
                  <Text className="text-[#646464]">{bookingData?.time}</Text>
                </View>
              </View>
              <View className="flex-row justify-between items-start mb-2">
                <Text className="text-base font-medium">Seat:</Text>
                <Text className="text-[#646464] max-w-[200px] text-right">
                  {bookingData?.seats
                    .map((seat) => seatArray[Number(seat.seat_number) - 1])
                    .join(", ")}
                </Text>
              </View>
              <View className="flex-row justify-between items-start mb-2">
                <Text className="text-base font-medium">Combo:</Text>
                <Text className="text-[#646464] max-w-[200px] text-right">
                  {bookingData?.combos.map((combo) => combo.name).join(", ")}
                </Text>
              </View>
              <View className="flex-row justify-between items-start">
                <Text className="text-base font-medium">Total:</Text>
                <Text className="text-[#646464] max-w-[200px] text-right">
                  {formatCurrency(bookingData.total_amount)}VND
                </Text>
              </View>
            </View>
          </View>
        )}
        {isFailed && (
          <View className="flex-col justify-center items-center px-[30px] pt-[40px]">
            <Image source={require("../assets/error_icon.png")} />
            <Text className="text-xl font-medium my-[22px] text-center">
              Payment failed!
            </Text>
            <Text className="text-base text-center mb-[40px]">
              Something went wrong we couldn’t process your payment. Please try
              payment again or contact our support.
            </Text>
          </View>
        )}
      </ScrollView>
      {((bookingData && bookingData.payment_status === 1) || isFailed) && (
        <View className="fixed bottom-0 mx-4 my-4 border-t-2 border-[#E8E8E8]">
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            className="px-[16px] py-[12px] bg-[#AE1F17] rounded-lg"
          >
            <Text className="text-center text-[16px] font-semibold text-white">
              Go home
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
