import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
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
}

export default function MovieList(props: Props) {
  const { title, data, isLoading } = props;
  const navigation = useNavigation<any>();
  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-black text-xl font-semibold">{title}</Text>
        <TouchableOpacity className="flex flex-row items-center ">
          <Text className="text-lg font-normal text-[#6F767E]">View All</Text>
          <ChevronRightIcon size="18" strokeWidth={2} color="#6F767E" />
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
                onPress={() => navigation.navigate("Movie", { movie: movie })}
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
                    {movie.name.length > 14
                      ? movie.name.slice(0, 14) + "..."
                      : movie.name}
                  </Text>
                  <Text className="text-xs font-normal">
                    {movie.genres.length > 14
                      ? movie.genres.slice(0, 14) + "..."
                      : movie.genres}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        {isLoading &&
          Array.from({ length: 3 }).map((item: any, index: number) => {
            return (
              <TouchableWithoutFeedback key={index}>
                <View className="space-y-1 mr-4">
                  <Image
                    source={require("../assets/movie_demo.png")}
                    style={{
                      width: width * 0.33,
                      height: height * 0.22,
                    }}
                    className="rounded-xl"
                  />
                  <Text className="text-sm font-medium">
                    {"Movie Name".length > 14
                      ? "Movie Name".slice(0, 14) + "..."
                      : "Movie Name"}
                  </Text>
                  <Text className="text-xs font-normal">
                    {"Family, Comedy, Adventure, Mythology".length > 14
                      ? "Family, Comedy, Adventure, Mythology".slice(0, 14) +
                        "..."
                      : "Family, Comedy, Adventure, Mythology"}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
      </ScrollView>
    </View>
  );
}
