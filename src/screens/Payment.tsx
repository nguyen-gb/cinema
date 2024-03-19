import { useNavigation, useRoute } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import classNames from "classnames";

import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import bookingApi from "apis/booking.api";
import { seatArray } from "constants/seat";
import { formatCurrency } from "utils/utils";
import { AppContext } from "contexts/app.context";

const PaymentScreen: React.FC = () => {
  const { profile } = useContext(AppContext);
  const { bookingId } = useRoute().params as any;
  const navigation = useNavigation<any>();

  const { data } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => bookingApi.getBookingDetail(bookingId as string),
  });
  const bookingData = data?.data.data;

  const handlePayment = () => {
    navigation.navigate("CheckBooking", { bookingId });
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
          <Text className="text-xl font-semibold">Payment</Text>
        </SafeAreaView>
      </View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        className="w-full flex-1 px-4 py-3"
      >
        <Text className="text-[#33383F] text-lg font-bold mb-[12px]">
          Movie information
        </Text>
        <View className="w-full flex-row items-start p-4 border-gray-500 border rounded-xl mb-2">
          <View className="w-[90px] h-[126px] mr-4">
            <Image
              src={bookingData?.movie_poster}
              source={require("../assets/movie_demo.png")}
              className="w-full h-full object-contain rounded-xl"
            />
          </View>
          <View className="flex-col items-start">
            <View className="flex-row items-center mb-1">
              <Text className="text-white text-center text-xs leading-4 bg-[#E89C29] rounded-2xl w-[36px] mr-2">
                {bookingData?.movie_age}
              </Text>
              <Text className="text=[#646464] text-base">
                {bookingData?.movie_name}
              </Text>
            </View>
            <View className="flex-row items-center mb-1">
              <Text className="text-base font-semibold">
                {bookingData?.showtime}
              </Text>
              <Text className="text-base font-semibold"> - </Text>
              <Text className="text-base font-semibold">
                {bookingData?.time}
              </Text>
              <Text className="text-base font-semibold">
                {" | "}
                {bookingData?.format}
              </Text>
            </View>
            <Text className="text-sm text-[#646464] mb-1">
              Cinema: {bookingData?.theater_name}
            </Text>
            <Text className="text-sm text-[#646464] mb-1">
              Room:{" "}
              {bookingData?.seats
                .map((seat) => seatArray[Number(seat.seat_number) - 1])
                .join(", ")}
            </Text>
            <Text className="text-sm text-[#646464] mb-1">
              Cinema: {bookingData?.theater_name}
            </Text>
          </View>
        </View>
        <Text className="text-[#33383F] text-lg font-bold my-[12px]">
          Combo information
        </Text>
        <View className="w-full p-4 border-gray-500 border rounded-md mb-2">
          {bookingData?.combos.map((combo, index) => {
            return (
              <View
                className={classNames(
                  "w-full flex-row items-center justify-between py-2",
                  {
                    "border-t-[1px] border-[#6F767E]": index > 0,
                  }
                )}
                key={combo._id}
              >
                <View className="flex-col">
                  <Text className="text-base font-normal text-[#6F767E]">
                    {combo.description}
                  </Text>
                  <Text className="text-base font-bold text-[#33383F]">
                    {formatCurrency(combo.quantity * combo.price)}
                    VND
                  </Text>
                </View>
                <Text className="text-base font-normal text-[#33383F]">
                  x{combo.quantity}
                </Text>
              </View>
            );
          })}
        </View>
        <Text className="text-[#33383F] text-lg font-bold my-[12px]">
          User information
        </Text>
        <View className="w-full p-4 border-gray-500 border rounded-md mb-2">
          <View className="flex-col">
            <Text className="text-lg font-medium">{profile?.name}</Text>
            <Text className="text-sm font-normal text-[#646464]">
              {profile?.phone} -{" "}
              {profile?.email && profile.email.length > 30
                ? profile.email.slice(0, 30) + "..."
                : profile?.email}
            </Text>
          </View>
        </View>
        <View className="w-full p-4 bg-[#D7E3FC] rounded-md my-[12px]">
          <View className="flex-row">
            <View className="w-6 h-6">
              <Image
                className="w-full h-full"
                source={require("../assets/info_icon.png")}
              />
            </View>
            <View className="ml-3 pr-4">
              <Text className="text-sm text-[#33383F]">Note:</Text>
              <Text className="text-sm text-[#33383F]">
                Tickets purchased are non-exchangeable and non-refundable.
              </Text>
              <Text className="text-sm text-[#33383F]">
                When requested, please present identification to verify age when
                viewing the movie.
              </Text>
              <Text className="text-sm text-[#33383F]">
                Do not buy tickets for children under 13 years old for movie
                screenings that end after 10:00 p.m.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View className="fixed bottom-0 mx-4 my-4 border-t-2 border-[#E8E8E8]">
        <View className="w-full flex-row items-center justify-between mt-3">
          <Text className="text-start text-base">Total</Text>
          <Text className="text-start text-lg font-bold text-primary">
            {formatCurrency(bookingData?.total_amount ?? 0)}
            VND
          </Text>
        </View>
        <View className="w-full flex-row items-center justify-between my-3">
          <Text className="text-start text-base">Payment gateways</Text>
          <Text className="text-start text-lg font-bold text-primary">
            VNPAY
          </Text>
        </View>
        <TouchableOpacity
          className="px-[16px] py-[12px] bg-[#AE1F17] rounded-lg"
          onPress={handlePayment}
        >
          <Text className="text-center text-[16px] font-semibold text-white">
            Payment
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentScreen;
