import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { debounce } from "lodash";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useQuery } from "@tanstack/react-query";

import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import movieApi from "apis/movie.api";
import Loading from "components/Loading";

const { width, height } = Dimensions.get("window");

export default function SearchScreen() {
  const navigation = useNavigation<any>();
  const [keySearch, setKeySearch] = useState<string>("");

  const { data, isLoading } = useQuery({
    queryKey: [keySearch],
    queryFn: () => {
      return movieApi.getMovies({ key_search: keySearch });
    },
    staleTime: 3 * 60 * 1000,
  });
  const movie = data?.data.data;

  const handleSearch = (value: string) => {
    setKeySearch(value);
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <SafeAreaView className="bg-white flex-1">
      <ExpoStatusBar style="dark" />
      <View className="mx-4 mb-3 flex-row justify-between items-center border border-primary rounded-full">
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search..."
          className="pb-1 pl-6 flex-1 text-base font-semibold tracking-wider"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          className="rounded-full p-3 m-1 bg-primary"
        >
          <XMarkIcon size="25" color="white" />
        </TouchableOpacity>
      </View>
      {keySearch && isLoading && <Loading />}
      {keySearch && !isLoading && movie && movie.length > 0 && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
        >
          <Text className="text-primary font-semibold ml-1">
            Results ({movie.length})
          </Text>
          <View className="flex-row justify-between flex-wrap">
            {movie.map((item) => {
              return (
                <TouchableWithoutFeedback
                  key={item._id}
                  onPress={() =>
                    navigation.navigate("Movie", {
                      movie: item,
                      now: Date.now(),
                    })
                  }
                >
                  <View className="space-y-2 mb-5">
                    <Image
                      src={item.poster}
                      source={require("../assets/movie_demo.png")}
                      style={{
                        width: width * 0.44,
                        height: height * 0.3,
                      }}
                      className="rounded-3xl"
                    />
                    <Text className="text-sm font-medium">
                      {item.name.length > 20
                        ? item.name.slice(0, 20) + "..."
                        : item.name}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      )}
      {!isLoading && (!keySearch || !movie || movie.length === 0) && (
        <View className="flex-row justify-center items-center mt-20">
          <Image
            source={require("../assets/movie_time.png")}
            className="h-96 w-96"
          />
        </View>
      )}
    </SafeAreaView>
  );
}
