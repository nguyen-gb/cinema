import React from "react";
import { useNavigation } from "@react-navigation/native";

import Carousel from "react-native-snap-carousel";
import { View, Text, Dimensions } from "react-native";
import MovieCard from "./MovieCard";

const { width } = Dimensions.get("window");

interface Props {
  data: any;
}

export default function TrendingMovies(props: Props) {
  const navigation = useNavigation();

  const handleClick = () => {
    navigation.navigate("Movie", item);
  };
  return (
    <View className="mb-8">
      <Text className="text-black text-xl font-semibold mx-4 mb-5">
        Trending
      </Text>
      <Carousel
        data={props.data}
        renderItem={({ item }) => (
          <MovieCard item={item} handleClick={handleClick} />
        )}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.82}
        slideStyle={{ display: "flex", alignItems: "center" }}
      />
    </View>
  );
}
