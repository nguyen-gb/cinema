import React from "react";

import { Dimensions, TouchableWithoutFeedback, Image } from "react-native";

const { width, height } = Dimensions.get("window");

interface Props {
  item: any;
  handleClick: any;
}

export default function MovieCard(props: Props) {
  const { item, handleClick } = props;
  return (
    <TouchableWithoutFeedback onPress={handleClick}>
      <Image
        source={require("../assets/movie_demo.png")}
        style={{
          width: width * 0.8,
          height: height * 0.5,
        }}
        className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  );
}
