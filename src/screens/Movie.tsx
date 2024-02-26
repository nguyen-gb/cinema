import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";

import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
} from "react-native";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const topMargin = ios ? "" : "mt-3";

export default function MovieScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [showFullText, setShowFullText] = useState(false);

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-white"
    >
      <View className="w-full py-3">
        <SafeAreaView
          className={
            "z-20 w-full flex flex-row justify-start items-center px-4 " +
            topMargin
          }
        >
          <TouchableOpacity
            className="mr-2"
            onPress={() => navigation.goBack()}
          >
            <ChevronLeftIcon size="28" strokeWidth={2.5} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold">Wonka</Text>
        </SafeAreaView>
      </View>
      <View className="w-full">
        <Image
          className="w-full h-[250px]"
          source={require("../assets/thumbnail_demo.png")}
        />
        <View className="flex-row mx-4">
          <View className="w-[100px] h-[150px] mt-[-20px]">
            <Image
              source={require("../assets/movie_demo.png")}
              className="w-full h-full object-contain"
            />
          </View>
          <View className="flex-col p-2">
            <Text className="text-base font-semibold my-1">Wonka</Text>
            <Text
              className="text-xs font-normal my-1 mr-20"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Family, Comedy, Adventure, Mythology Family, Comedy, Adventure,
              Mythology
            </Text>
            <Text className="text-white text-center text-xs leading-4 bg-[#E89C29] rounded-2xl w-[36px] my-2">
              13+
            </Text>
          </View>
        </View>
        <View className="flex-row justify-around items-center py-4 px-4">
          <View>
            <Text className="text-xs leading-[22px] font-normal text-[#6f767ebf]">
              Release date
            </Text>
            <Text className="text-sm leading-[22px] font-medium text-[#33383F]">
              26/01/2024
            </Text>
          </View>
          <View className="h-full w-[0.75px] bg-[#6f767ebf]"></View>
          <View>
            <Text className="text-xs leading-[22px] font-normal text-[#6f767ebf]">
              Duration
            </Text>
            <Text className="text-sm leading-[22px] font-medium text-[#33383F]">
              88 min
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
            Based on the character from the worldwide children's bedside book
            "Charlie and the Chocolate Factory" and the 2005 movie version of
            the same name, WONKA tells the magical story of an inventor's
            journey. , the world's greatest magician and chocolate maker became
            the adorable WILLY WONKA we know today. From the director of the
            Paddington series and the producer of the hit Harry Potter
            adaptation series, WONKA promises to be a fun and colorful movie for
            audiences this Christmas.
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
        <TouchableOpacity className="px-[16px] py-[12px] bg-[#AE1F17] rounded-lg mx-4 my-4">
          <Text className="text-center text-[16px] font-semibold text-white">
            Book now
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
