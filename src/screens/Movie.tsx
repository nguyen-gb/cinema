import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";

import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { Movie } from "types/movie.type";

export default function MovieScreen() {
  const { params } = useRoute();
  const navigation = useNavigation<any>();
  const [showFullText, setShowFullText] = useState(false);

  const movie = (params as any).movie as Movie;

  return (
    <View className="flex-1 bg-white">
      <View className="w-full py-3">
        <SafeAreaView className="z-20 w-full flex flex-row justify-start items-center px-4">
          <TouchableOpacity
            className="mr-2"
            onPress={() => navigation.goBack()}
          >
            <ChevronLeftIcon size="28" strokeWidth={2.5} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold">{movie.name}</Text>
        </SafeAreaView>
      </View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        className="flex-1 w-full"
      >
        <Image className="w-full h-[250px]" src={movie.thumbnail} />
        <View className="flex-row mx-4">
          <View className="w-[100px] h-[150px] mt-[-20px]">
            <Image
              src={movie.poster}
              className="w-full h-full object-contain"
            />
          </View>
          <View className="flex-col p-2">
            <Text className="text-base font-semibold my-1">{movie.name}</Text>
            <Text
              className="text-xs font-normal my-1 mr-20"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {movie.genres}
            </Text>
            <Text className="text-white text-center text-xs leading-4 bg-[#E89C29] rounded-2xl w-[36px] my-2">
              {movie.age}
            </Text>
          </View>
        </View>
        <View className="flex-row justify-around items-center py-4 px-4">
          <View>
            <Text className="text-xs leading-[22px] font-normal text-[#6f767ebf]">
              Release date
            </Text>
            <Text className="text-sm leading-[22px] font-medium text-[#33383F]">
              {movie.release}
            </Text>
          </View>
          <View className="h-full w-[0.75px] bg-[#6f767ebf]"></View>
          <View>
            <Text className="text-xs leading-[22px] font-normal text-[#6f767ebf]">
              Duration
            </Text>
            <Text className="text-sm leading-[22px] font-medium text-[#33383F]">
              {movie.duration} min
            </Text>
          </View>
          <View className="h-full w-[0.75px] bg-[#6f767ebf]"></View>
          <View>
            <Text className="text-xs leading-[22px] font-normal text-[#6f767ebf]">
              Language
            </Text>
            <Text className="text-sm leading-[22px] font-medium text-[#33383F]">
              Subtitles
            </Text>
          </View>
        </View>
        <View className="h-[0.75px] bg-[#6f767ebf] mx-4"></View>
        <View className="mx-4 my-4">
          <Text className="text-base font-semibold">Story line</Text>
          <Text
            className="text-sm font-normal"
            numberOfLines={showFullText ? undefined : 3}
            ellipsizeMode="tail"
          >
            {movie.description}
            {showFullText && (
              <Text
                className="text-sm font-normal text-[#AE1F17]"
                onPress={() => setShowFullText(false)}
              >
                {" "}
                Hide less
              </Text>
            )}
          </Text>
          {!showFullText && (
            <Text
              className="text-sm font-normal text-[#AE1F17]"
              onPress={() => setShowFullText(true)}
            >
              See more
            </Text>
          )}
        </View>
      </ScrollView>
      <TouchableOpacity
        className="fixed bottom-0 px-[16px] py-[12px] bg-[#AE1F17] rounded-lg mx-4 my-4"
        onPress={() => navigation.navigate("Showtime", { movie })}
      >
        <Text className="text-center text-[16px] font-semibold text-white">
          Book now
        </Text>
      </TouchableOpacity>
    </View>
  );
}
