import { useNavigation, useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import React, { useState } from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";

import movieApi from "apis/movie.api";
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "components/Loading";

const { width, height } = Dimensions.get("window");

interface Props {
  title: string;
  status: number;
}

export default function ListMovieScreen() {
  const { title, status } = useRoute().params as Props;
  const [genre, setGenre] = useState("");

  const navigation = useNavigation<any>();

  const { data: dataGenres } = useQuery({
    queryKey: [status],
    queryFn: () => {
      return movieApi.getGenres();
    },
  });

  const genres = dataGenres?.data.data;

  const { data: dataMovie, isLoading } = useQuery({
    queryKey: [status],
    queryFn: () => {
      return movieApi.getMovies({ status: status });
    },
  });
  const movie = dataMovie?.data.data;

  return (
    <SafeAreaView className="bg-white flex-1">
      <ExpoStatusBar style="dark" />
      <View className="w-full py-3">
        <View className="z-20 w-full flex flex-row justify-start items-center px-4">
          <TouchableOpacity
            className="mr-2"
            onPress={() => navigation.navigate("Home")}
          >
            <ChevronLeftIcon size="28" strokeWidth={2.5} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold">{title}</Text>
        </View>
      </View>
      {isLoading && <Loading />}
      {!isLoading && movie && movie.length > 0 && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
        >
          <View className="flex-row justify-between flex-wrap">
            {movie.map((item) => {
              return (
                <TouchableWithoutFeedback
                  key={item._id}
                  onPress={() => navigation.navigate("Movie", { movie: item })}
                >
                  <View className="space-y-2 mb-5">
                    <Image
                      src={item.poster}
                      source={require("../assets/movie_demo.png")}
                      style={{
                        width: width * 0.44,
                        height: height * 0.3,
                      }}
                      className="rounded-3xl"
                    />
                    <Text className="text-sm font-medium">
                      {item.name.length > 20
                        ? item.name.slice(0, 20) + "..."
                        : item.name}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      )}
      {!isLoading && (!movie || movie.length === 0) && (
        <View className="flex-row justify-center items-center mt-20">
          <Image
            source={require("../assets/movie_time.png")}
            className="h-96 w-96"
          />
        </View>
      )}
    </SafeAreaView>
  );
}
