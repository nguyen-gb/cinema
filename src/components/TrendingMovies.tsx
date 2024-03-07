import React from "react";
import { useNavigation } from "@react-navigation/native";

import Carousel from "react-native-snap-carousel";
import { View, Text, Dimensions, Animated } from "react-native";
import MovieCard from "./MovieCard";
import { Movie } from "types/movie.type";

const { width, height } = Dimensions.get("window");

interface Props {
  data: Movie[];
  isLoading: boolean;
}

export default function TrendingMovies(props: Props) {
  const navigation = useNavigation<any>();
  const { data, isLoading } = props;

  const handleClick = (item: any) => {
    navigation.navigate("Movie", item);
  };
  return (
    <View className="mb-8">
      <Text className="text-black text-xl font-semibold mx-4 mb-5">
        Trending
      </Text>
      {data && (
        <Carousel
          data={data}
          renderItem={({ item }) => (
            <MovieCard item={item} handleClick={() => handleClick(item)} />
          )}
          firstItem={1}
          inactiveSlideOpacity={0.6}
          sliderWidth={width}
          itemWidth={width * 0.72}
          slideStyle={{ display: "flex", alignItems: "center" }}
        />
      )}
      {isLoading && (
        <Carousel
          data={Array.from({ length: 3 })}
          renderItem={() => (
            <Animated.View className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center rounded-3xl">
              <Animated.View
                style={{
                  width: width * 0.7,
                  height: height * 0.5,
                }}
                className="flex items-center justify-center bg-gray-300 sm:w-96 dark:bg-gray-700 rounded-3xl"
              ></Animated.View>
            </Animated.View>
          )}
          firstItem={1}
          inactiveSlideOpacity={0.6}
          sliderWidth={width}
          itemWidth={width * 0.72}
          slideStyle={{ display: "flex", alignItems: "center" }}
        />
      )}
    </View>
  );
}
