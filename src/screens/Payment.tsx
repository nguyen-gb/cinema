import { useNavigation, useRoute } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useQuery } from "@tanstack/react-query";

import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import bookingApi from "apis/booking.api";
import { seatArray } from "constants/seat";
import { formatCurrency } from "utils/utils";
import { Seat } from "types/seat.type";

const PaymentScreen: React.FC = () => {
  const { bookingId } = useRoute().params as any;
  const navigation = useNavigation<any>();

  const { data } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => bookingApi.getBookingDetail(bookingId as string),
  });
  const bookingData = data?.data.data;

  const handlePayment = () => {};

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
        <View className="w-full p-4 border-gray-500 border rounded-md mb-2">
          <Text className="text-lg font-semibold mb-2">
            {bookingData?.movie_name}
          </Text>
          <View className="flex-row items-start">
            <View className="flex-1">
              <Text className="text-start text-base text-gray-500">Cinema</Text>
              <Text className="text-base font-semibold text-primary">
                {bookingData?.theater_name}
              </Text>
            </View>
            <View className="flex-1">
              <Text className="text-start text-base text-gray-500">Room</Text>
              <Text className="text-base font-semibold text-primary">
                {bookingData?.room_number}
              </Text>
            </View>
          </View>
          <View className="h-[1px] w-full bg-gray-500 my-4"></View>
          <View className="flex-row items-start">
            <View className="flex-1">
              <Text className="text-start text-base text-gray-500">Time</Text>
              <View className="flex-row">
                <Text className="text-base font-semibold text-primary">
                  {bookingData?.showtime}
                </Text>
                <Text className="text-base font-semibold text-primary">
                  {" "}
                  -{" "}
                </Text>
                <Text className="text-base font-semibold text-primary">
                  {bookingData?.time}
                </Text>
              </View>
            </View>
            <View className="flex-1">
              <Text className="text-start text-base text-gray-500">Format</Text>
              <Text className="text-base font-semibold text-primary">
                {bookingData?.format}
              </Text>
            </View>
          </View>
        </View>
        <View className="w-full p-4 border-gray-500 border rounded-md mb-2">
          <Text className="text-lg font-semibold mb-2">
            Billing Information
          </Text>
          <View className="w-full flex-row items-center justify-between mb-1">
            <Text className="text-start text-base text-gray-500">Category</Text>
            <Text className="text-start text-base text-gray-500">
              Total amount
            </Text>
          </View>
          <View className="w-full flex-row items-center justify-between">
            <Text className="text-base font-semibold text-primary">
              {bookingData?.seats
                .map((seat) => seatArray[Number(seat.seat_number) - 1])
                .join(", ")}
            </Text>
            {bookingData?.seats && (
              <Text className="text-base font-semibold text-primary">
                {formatCurrency(
                  (bookingData?.seats as Seat[]).reduce(
                    (sum, seat) => sum + (seat.price as number),
                    0
                  )
                )}
                VND
              </Text>
            )}
          </View>
          {bookingData?.combos.map((combo) => {
            return (
              <View
                className="w-full flex-row items-center justify-between"
                key={combo._id}
              >
                <Text className="text-base font-semibold text-primary">
                  {combo.quantity} x {combo.description}
                </Text>
                <Text className="text-base font-semibold text-primary">
                  {formatCurrency(combo.quantity * combo.price)}
                  VND
                </Text>
              </View>
            );
          })}
        </View>
        <View className="w-full p-4 border-gray-500 border rounded-md mb-2">
          <Text className="text-lg font-semibold mb-2">Payment methods</Text>
          <View className="w-full flex-row items-center justify-between mb-1">
            <Text className="text-start text-base text-gray-500">
              Payment gateways
            </Text>
            <Text className="text-start text-base font-semibold text-primary">
              VNPAY
            </Text>
          </View>
          <View className="w-full flex-row items-center justify-between mb-1">
            <Text className="text-start text-base text-gray-500">Total</Text>
            <Text className="text-start text-base font-semibold text-primary">
              {formatCurrency(bookingData?.total_amount ?? 0)}
              VND
            </Text>
          </View>
        </View>
      </ScrollView>
      <View className="fixed bottom-0 mx-4 my-4 border-t-2 border-[#E8E8E8]">
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
