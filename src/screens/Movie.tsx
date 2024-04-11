import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ArrowDownIcon, ChevronLeftIcon } from "react-native-heroicons/outline";
import { useQuery } from "@tanstack/react-query";

import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { Movie } from "types/movie.type";
import { UserReview } from "types/user.type";
import movieApi from "apis/movie.api";

export default function MovieScreen() {
  const { params } = useRoute();
  const navigation = useNavigation<any>();
  const [showFullText, setShowFullText] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const [record, setRecord] = useState<UserReview[]>([]);
  const [totalReview, setTotalReview] = useState("0");
  const [totalRecord, setTotalRecord] = useState(0);

  const queryConfig = {
    page: 1,
    page_size: pageSize,
  };

  const movie = (params as any).movie as Movie;

  const { data: productReviewData } = useQuery({
    queryKey: ["review", movie._id, pageSize],
    queryFn: () => movieApi.getMovieReview(movie._id, queryConfig),
  });

  const handleViewMore = () => {
    setPageSize((pre) => pre + 5);
  };

  useEffect(() => {
    productReviewData && setTotalReview(productReviewData?.data.total_review);
    productReviewData && setTotalRecord(productReviewData?.data.total_record);
    productReviewData && setRecord(productReviewData.data.data);
  }, [productReviewData]);

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
          <Text className="text-xl font-semibold">
            {movie.name.length > 25
              ? movie.name.slice(0, 25) + "..."
              : movie.name}
          </Text>
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
            <Text className="text-base font-semibold my-1 mr-20">
              {movie.name}
            </Text>
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
          <Text className="text-lg font-semibold">Story line</Text>
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
        <View className="h-[0.75px] bg-[#6f767ebf] mx-4"></View>
        <View className="mx-4 my-4">
          <Text className="text-lg font-semibold mb-[6px]">Review</Text>
          <View className="flex-row items-center gap-2 mb-[20px]">
            <Image
              className="w-8 h-8"
              source={require("../assets/yellow_star_icon.png")}
            />
            <View className="flex-row items-center">
              <Text className="text-[18px] leading-[22px] font-bold">
                {totalReview == "NaN" ? "-" : totalReview}
              </Text>
              <Text className="leading-[22px] text-[#727272]">
                /5 - {totalRecord} review(s)
              </Text>
            </View>
          </View>
          <View className="flex-col gap-4">
            {record &&
              record.map((review, index) => (
                <View key={index} className="flex-col gap-1">
                  <Text className="text-base font-semibold text-primary">
                    {review.user_name}
                  </Text>
                  <View className="flex-row items-center">
                    {Array.from({ length: 5 }).map((_, index) => {
                      return (
                        <View key={index}>
                          {index + 1 <= review.rating ? (
                            <Image
                              className="h-5 w-5"
                              source={require("../assets/yellow_star_icon.png")}
                            />
                          ) : (
                            <Image
                              className="h-5 w-5"
                              source={require("../assets/gray_star_icon.png")}
                            />
                          )}
                        </View>
                      );
                    })}
                  </View>
                  <Text className="text-[#33383F] text-base">
                    {review.review}
                  </Text>
                  <View className="h-[0.75px] bg-[#6f767ebf] my-4"></View>
                </View>
              ))}
            {totalRecord > pageSize && (
              <View className="w-full flex-row justify-center">
                <TouchableOpacity
                  onPress={handleViewMore}
                  className="p-2 border-[2px] border-primary rounded-[10px] flex-row items-center"
                >
                  <Text className="text-primary text-base font-semibold mr-2">
                    View more
                  </Text>
                  <ArrowDownIcon size="22" strokeWidth={3} color="#AE1F17" />
                </TouchableOpacity>
              </View>
            )}
          </View>
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
