import React from "react";

import * as Progress from "react-native-progress";
import { View, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default function Loading() {
  return (
    <View
      style={{ width, height }}
      className="absolute flex-row justify-center items-center z-[99]"
    >
      <Progress.CircleSnail thickness={12} size={160} color="#AE1F17" />
    </View>
  );
}
