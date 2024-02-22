import React, { FC, useState } from "react";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";

import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import {
  Image,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TrendingMovies from "components/TrendingMovies";
import MovieList from "components/MovieList";

const ios = Platform.OS == "ios";
const HomeScreen: FC = () => {
  const [trending, setTrending] = useState([1, 2, 3]);
  const [upcoming, setUpcoming] = useState([1, 2, 3]);

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
        <ExpoStatusBar style="dark" />
        <View className="flex-row justify-between items-center mx-4">
          <Bars3CenterLeftIcon size="30" strokeWidth={2} color="#AE1F17" />
          <Image source={require("../assets/logo.png")} />
          <TouchableOpacity>
            <MagnifyingGlassIcon size={30} strokeWidth={2} color="#AE1F17" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        <TrendingMovies data={trending} />
        <MovieList title="Upcoming" data={upcoming} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
