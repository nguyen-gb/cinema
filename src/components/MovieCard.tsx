import React from "react";

import { Dimensions, TouchableWithoutFeedback, Image } from "react-native";
import { Movie } from "types/movie.type";

const { width, height } = Dimensions.get("window");

interface Props {
  item: Movie;
  handleClick: any;
}

export default function MovieCard(props: Props) {
  const { item, handleClick } = props;
  return (
    <TouchableWithoutFeedback onPress={handleClick}>
      <Image
        src={item.poster}
        source={require("../assets/movie_demo.png")}
        style={{
          width: width * 0.7,
          height: height * 0.5,
        }}
        className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  );
}
