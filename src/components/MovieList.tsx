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
        <TouchableOpacity>
          <Text className="text-lg font-normal text-[#6F767E]">View all</Text>
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
                <Text>Movie Name</Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
}
