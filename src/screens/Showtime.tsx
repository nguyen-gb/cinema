import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronUpIcon,
} from "react-native-heroicons/outline";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";

import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Movie } from "types/movie.type";
import cinemaApi from "apis/cinema.api";
import showtimeApi from "apis/showtime.api";
import { isTodayShowTime } from "utils/utils";

export default function ShowtimeScreen() {
  const { params } = useRoute();
  const navigation = useNavigation<any>();
  const movie = (params as any).movie as Movie;
  const [cinemaId, setCinemaId] = useState("65203b82210d84d5c627f8b1");
  const [isOpen, setIsOpen] = useState(false);
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const currentMinute = currentDate.getMinutes();

  const { data: cinemaData } = useQuery({
    queryKey: ["cinema"],
    queryFn: cinemaApi.getCinemas,
  });
  const cinemas = cinemaData?.data.data;

  const { data: showtimeData } = useQuery({
    queryKey: ["showtime", cinemaId, movie._id],
    queryFn: () =>
      showtimeApi.getShowtimesByMovie({
        theater_id: cinemaId,
        movie_id: movie._id,
      }),
  });
  const showtimes = showtimeData?.data.data[0].times;

  const handleChooseCinema = (id: string) => {
    if (cinemaId === id) {
      setIsOpen(!isOpen);
    } else {
      setIsOpen(true);
      setCinemaId(id);
    }
  };

  const handleChooseTime = (showtime_id: string) => {
    console.log(showtime_id);
  };

  useEffect(() => {
    if (cinemas) {
      setCinemaId(cinemas[0]._id);
    }
  }, []);

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
          <Text className="text-xl font-semibold">{movie.name}</Text>
        </SafeAreaView>
      </View>
      <Text className="w-full px-4 text-xl font-semibold text-black">
        <Text className="text-primary">CGV</Text> Cinemas
      </Text>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        className="w-full flex-1 px-4 py-3"
      >
        {cinemas &&
          cinemas.length > 0 &&
          cinemas.map((cinema) => (
            <View key={cinema._id}>
              <TouchableOpacity
                onPress={() => handleChooseCinema(cinema._id)}
                className="flex-row justify-between items-center w-full mb-4 border-t border-[#E8E8E8] rounded-lg p-2"
              >
                <View className="mr-4">
                  <Text className="text-base font-semibold text-primary">
                    {cinema.name.length > 50
                      ? cinema.name.slice(0, 50) + "..."
                      : cinema.name}
                  </Text>
                  <Text className="text-xs font-normal text-black">
                    {cinema.address.length > 50
                      ? cinema.address.slice(0, 50) + "..."
                      : cinema.address}
                  </Text>
                </View>
                <View
                  className={classNames(
                    "transition-transform duration-1000 ease-in-out",
                    {
                      "rotate-0": cinema._id !== cinemaId || isOpen,
                      "rotate-180": cinema._id === cinemaId && isOpen,
                    }
                  )}
                >
                  <ChevronDownIcon size="28" strokeWidth={2} color="black" />
                </View>
              </TouchableOpacity>
              {cinema._id === cinemaId &&
                isOpen &&
                (showtimes && showtimes?.length > 0 ? (
                  showtimes.map((showtime) => (
                    <View
                      key={showtime.time}
                      className={classNames(
                        "px-2 origin-top-right transition-all duration-1000 ease-in-out overflow-hidden",
                        {
                          "max-h-0": !isOpen || cinema._id !== cinemaId,
                          "max-h-[1000px]": isOpen && cinema._id === cinemaId,
                        }
                      )}
                    >
                      {isTodayShowTime(showtime.time) ? (
                        <Text className="mb-[20px] max-w-fit bg-tertiary text-white px-[20px] py-[8px] font-semibold">
                          Today,{" "}
                          {new Date().toLocaleString("en-EN", {
                            month: "long",
                            day: "numeric",
                          })}
                        </Text>
                      ) : (
                        <Text className="mb-[20px] max-w-fit bg-tertiary text-white px-[20px] py-[8px] font-semibold">
                          {new Date(showtime.time).toLocaleString("en-EN", {
                            month: "long",
                            day: "numeric",
                            weekday: "long",
                          })}
                        </Text>
                      )}
                      <View className="mb-[12px] flex-row flex-wrap items-center justify-start">
                        {showtime.showtimes.map(
                          ({ showtime_id, showtime: time }) => {
                            const [hour, minute] = time.split(":").map(Number);
                            const isPastTime =
                              hour < currentHour ||
                              (hour === currentHour &&
                                minute < currentMinute - 5);
                            return (
                              <TouchableOpacity
                                onPress={() => handleChooseTime(showtime_id)}
                                key={showtime_id}
                                className={classNames(
                                  "mb-[8px] mr-[8px] rounded-md border border-white px-[20px] py-[8px]",
                                  {
                                    "bg-quaternary":
                                      isPastTime &&
                                      isTodayShowTime(showtime.time),
                                    "bg-primary":
                                      !isPastTime ||
                                      !isTodayShowTime(showtime.time),
                                  }
                                )}
                                disabled={
                                  isPastTime && isTodayShowTime(showtime.time)
                                }
                              >
                                <Text className="text-white">{time}</Text>
                              </TouchableOpacity>
                            );
                          }
                        )}
                      </View>
                    </View>
                  ))
                ) : (
                  <Text className="text-center text-lg italic">
                    No showtimes
                  </Text>
                ))}
            </View>
          ))}
      </ScrollView>
    </View>
  );
}
