import React, { useState } from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ConfirmPaymentRes } from "types/payment.type";
import { Review } from "types/user.type";
import userApi from "apis/user.api";

export default function ReviewScreen() {
  const { params } = useRoute();
  const navigation = useNavigation<any>();
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");

  const booking = (params as any).booking as ConfirmPaymentRes;

  const reviewMutation = useMutation({
    mutationFn: (body: Review) => userApi.reviewMovie(body),
  });

  const handleSubmit = () => {
    const body = {
      booking_id: booking._id,
      movie_id: booking.movie_id,
      rating: rating,
      review: review,
    };
    reviewMutation.mutate(body, {
      onSuccess: () => {
        setRating(1);
        setReview("");
        navigation.goBack();
      },
    });
  };

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
          <Text className="text-xl font-semibold">Write review</Text>
        </SafeAreaView>
      </View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        className="flex-1 w-full"
      >
        <Text className="w-full text-center text-xl font-semibold text-primary mb-[20px]">
          {booking.movie_name}
        </Text>
        <Text className="w-full text-center text-[#989898] text-base mb-[10px]">
          Click to rate
        </Text>
        <View className="w-full flex-row justify-center items-center gap-3 max-w-fit rounded-lg mb-[20px]">
          {Array.from({ length: 5 }).map((_, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => setRating(index + 1)}
              >
                {index + 1 <= rating ? (
                  <Image
                    className="w-8 h-8"
                    source={require("../assets/yellow_star_icon.png")}
                  />
                ) : (
                  <Image
                    className="w-8 h-8"
                    source={require("../assets/gray_star_icon.png")}
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
        <View className="bg-[#DEDEDE] h-[1px] mx-6 mb-[20px]"></View>
        <Text className="mx-6 text-base font-semibold mb-[10px]">
          Thoughts on the film
        </Text>
        <View className="mx-6 p-4 rounded-[10px] border-[#939393] border focus:border-primary transition-all mb-[20px]">
          <TextInput
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            placeholder="Now is the time for writing ✍️"
            onChangeText={(text) => setReview(text)}
            value={review}
          />
        </View>
        <TouchableOpacity
          className="mx-6 px-[16px] py-[12px] bg-[#AE1F17] rounded-lg mb-[24px]"
          onPress={handleSubmit}
        >
          <Text className="text-center text-[16px] font-semibold text-white">
            Submit review
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
