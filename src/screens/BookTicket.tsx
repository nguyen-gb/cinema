import { useNavigation, useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useState } from "react";

import showtimeApi from "apis/showtime.api";
import { seatArray } from "constants/seat";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SeatType } from "types/seat.type";
import { calculateTicketPrice, formatCurrency } from "utils/utils";

interface SeatProps {
  isReserved: boolean;
  isSelected: boolean;
  onSelect: () => void;
  isDoubleSeat?: boolean;
  SeatNumber: number;
}

const Seat: React.FC<SeatProps> = ({
  isReserved,
  isSelected,
  onSelect,
  isDoubleSeat = false,
  SeatNumber,
}) => {
  const seatClasses = `${
    isDoubleSeat ? "w-[72px] mx-5" : "w-9"
  } h-9 m-[3px] rounded-md ${
    isReserved
      ? "bg-red-500 cursor-not-allowed"
      : isSelected
      ? "bg-primary"
      : `${
          isDoubleSeat
            ? "bg-tertiary/80 hover:bg-tertiary"
            : "bg-[#252a31] hover:bg-[#374151] cursor-pointer"
        }`
  }`;

  return (
    <TouchableOpacity
      className={seatClasses}
      onPress={() => {
        if (!isReserved) {
          onSelect();
        }
      }}
    >
      <Text className="text-white text-center leading-8">
        {seatArray[SeatNumber - 1]}
      </Text>
    </TouchableOpacity>
  );
};

const BookTicketScreen: React.FC = () => {
  const { showtimeId, cinema } = useRoute().params as any;
  const navigation = useNavigation<any>();
  const [selectedSeats, setSelectedSeats] = useState<
    { seat_number: number; seat_type: number }[]
  >([]);
  const [total, setTotal] = useState(0);

  const rows = 9;
  const cols = 9;
  const totalSeats = rows * cols;

  const { data } = useQuery({
    queryKey: ["showtimes", showtimeId],
    queryFn: () => showtimeApi.getShowtimesById(showtimeId as string),
  });

  const handleContinue = () => {
    const selectedSeatsConvert = selectedSeats.map((seat) => {
      return {
        seat_number: String(seat.seat_number),
        seat_type: Number(seat.seat_type),
      };
    });
    const dataBookTicket = {
      theater_name: cinema.name,
      room_id: data?.data.data.room_id as string,
      movie_id: data?.data.data.movie_id as string,
      seats: selectedSeatsConvert,
      time: data?.data.data.time as string,
      showtime: data?.data.data.showtime as string,
      combos: [],
    };
    navigation.navigate("ListCombo", {
      dataBookTicket,
    });
  };

  const reservedSeats =
    data?.data.data.seat_array.map((seat) => {
      return {
        seat_number: Number(seat.seat_number),
        seat_type: seat.seat_type,
      };
    }) ?? [];

  const toggleSeat = (seat: { seat_number: number; seat_type: SeatType }) => {
    const seatIndex = selectedSeats.findIndex(
      (s) => s.seat_number === seat.seat_number
    );
    const seatPrice = calculateTicketPrice(seat.seat_type);

    if (seatIndex === -1) {
      setSelectedSeats([...selectedSeats, seat]);
      setTotal((pre) => pre + seatPrice);
    } else {
      setSelectedSeats(
        selectedSeats.filter((s) => s.seat_number !== seat.seat_number)
      );
      setTotal((pre) => pre - seatPrice);
    }
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
          <Text className="text-xl font-semibold">{cinema.name}</Text>
        </SafeAreaView>
      </View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        className="w-full flex-1 px-4 py-3"
      >
        <View className="w-full flex-col items-center justify-center">
          <View className="w-full">
            <Image source={require("../assets/line.png")} className="w-full" />
            <Text className="mb-6 text-center text-lg font-bold text-black">
              Screening room number {data?.data.data.room_number}
            </Text>
          </View>
          <View className="flex flex-wrap w-full items-start justify-center gap-2">
            <View className="flex flex-col w-full items-center justify-center">
              {Array.from({ length: rows }, (_, rowIndex) => (
                <View key={rowIndex} className="flex-row">
                  {Array.from({ length: cols }, (_, colIndex) => {
                    const SeatNumber = rowIndex * cols + colIndex + 1;
                    const seat = {
                      seat_number: SeatNumber,
                      seat_type: SeatType.single_chair,
                    };
                    return (
                      <Seat
                        key={colIndex}
                        isReserved={reservedSeats.some(
                          (s) => s.seat_number === SeatNumber
                        )}
                        isSelected={selectedSeats.some(
                          (s) => s.seat_number === SeatNumber
                        )}
                        onSelect={() => toggleSeat(seat)}
                        SeatNumber={SeatNumber}
                      />
                    );
                  })}
                </View>
              ))}
              <View className="flex-row mb-4">
                {Array.from({ length: 3 }, (_, index) => {
                  const SeatNumber = totalSeats + index + 1;
                  const seat = {
                    seat_number: SeatNumber,
                    seat_type: SeatType.double_chair,
                  };
                  return (
                    <Seat
                      key={index}
                      isReserved={reservedSeats.some(
                        (s) => s.seat_number === SeatNumber
                      )}
                      isSelected={selectedSeats.some(
                        (s) => s.seat_number === SeatNumber
                      )}
                      onSelect={() => toggleSeat(seat)}
                      isDoubleSeat={true}
                      SeatNumber={SeatNumber}
                    />
                  );
                })}
              </View>
              <View className="flex flex-row justify-between items-center gap-4">
                <View className="flex-col justify-start items-start gap-2">
                  <View className="flex-row items-center gap-2">
                    <View className="flex aspect-square w-8 items-center justify-center rounded-[4px] bg-red-500"></View>
                    <Text>Booked</Text>
                  </View>
                  <View className="flex-row items-center gap-2">
                    <View className="flex aspect-square w-8 items-center justify-center rounded-[4px] bg-primary"></View>
                    <Text>Chair of your choice</Text>
                  </View>
                </View>
                <View className="flex-col justify-start items-start gap-2">
                  <View className="flex-row items-center gap-2">
                    <View className="flex aspect-square w-8 items-center justify-center rounded-[4px] bg-[#252A31]"></View>
                    <Text>Regular chair</Text>
                  </View>
                  <View className="flex-row items-center gap-2">
                    <View className="flex aspect-square w-8 items-center justify-center rounded-[4px] bg-tertiary/80"></View>
                    <Text>Double chair</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View className="fixed bottom-0 mx-4 my-4 border-t-2 border-[#E8E8E8]">
        <View className="flex-row justify-between items-center py-[14px]">
          <Text className="text-base font-normal">Total</Text>
          <Text className="text-right text-xl font-semibold">
            {formatCurrency(total)}VND
          </Text>
        </View>
        <TouchableOpacity
          className="px-[16px] py-[12px] bg-[#AE1F17] rounded-lg"
          onPress={handleContinue}
        >
          <Text className="text-center text-[16px] font-semibold text-white">
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookTicketScreen;
