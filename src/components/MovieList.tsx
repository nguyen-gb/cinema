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

const { width, height } = Dimensions.get("window");

interface Props {
  title: string;
  data: any;
}

export default function MovieList(props: Props) {
  const { title, data } = props;
  const navigation = useNavigation();
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
        {data.map((item: any, index: number) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.navigate("Movie", item)}
            >
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
