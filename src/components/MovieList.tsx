import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  Animated,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { ChevronRightIcon } from "react-native-heroicons/outline";

import { Movie } from "types/movie.type";

const { width, height } = Dimensions.get("window");

interface Props {
  title: string;
  data: any;
  isLoading: boolean;
  handleViewAll: () => void;
}

export default function MovieList(props: Props) {
  const { title, data, isLoading, handleViewAll } = props;
  const navigation = useNavigation<any>();
  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-black text-xl font-semibold">{title}</Text>
        <TouchableOpacity
          className="flex flex-row items-center "
          onPress={handleViewAll}
        >
          <Text className="text-lg font-normal text-primary">View All</Text>
          <ChevronRightIcon size="18" strokeWidth={2} color="#AE1F17" />
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data &&
          data.map((movie: Movie) => {
            return (
              <TouchableWithoutFeedback
                key={movie._id}
                onPress={() =>
                  navigation.navigate("Movie", {
                    movie: movie,
                    now: Date.now(),
                  })
                }
              >
                <View className="space-y-1 mr-4">
                  <Image
                    src={movie.poster}
                    style={{
                      width: width * 0.33,
                      height: height * 0.22,
                    }}
                    className="rounded-xl"
                  />
                  <Text className="text-sm font-medium">
                    {movie.name.length > 15
                      ? movie.name.slice(0, 15) + "..."
                      : movie.name}
                  </Text>
                  <Text className="text-xs font-normal">
                    {movie.genres.length > 15
                      ? movie.genres.slice(0, 15) + "..."
                      : movie.genres}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        {isLoading &&
          Array.from({ length: 4 }).map((index) => {
            return (
              <TouchableWithoutFeedback key={index as any}>
                <Animated.View className="space-y-1 mr-4 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center rounded-3xl">
                  <Animated.View
                    style={{
                      width: width * 0.33,
                      height: height * 0.22,
                    }}
                    className="flex items-center justify-center bg-gray-300 sm:w-96 dark:bg-gray-700 rounded-3xl"
                  ></Animated.View>
                  <View
                    style={{ width: width * 0.22 }}
                    className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700"
                  ></View>
                  <View
                    style={{ width: width * 0.11 }}
                    className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700"
                  ></View>
                </Animated.View>
              </TouchableWithoutFeedback>
            );
          })}
      </ScrollView>
    </View>
  );
}
