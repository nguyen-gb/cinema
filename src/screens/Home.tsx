import React, { FC, useEffect, useState } from "react";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { useQuery } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";

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
import movieApi from "apis/movie.api";
import { Movie } from "types/movie.type";

const ios = Platform.OS == "ios";
const HomeScreen: FC = () => {
  const navigation = useNavigation<any>();
  const [trending, setTrending] = useState<Movie[]>([]);
  const [showing, setShowing] = useState<Movie[]>([]);
  const [upcoming, setUpcoming] = useState<Movie[]>([]);

  const { data: dataTrending, isLoading: isLoadingTrending } = useQuery({
    queryKey: ["most"],
    queryFn: () => {
      return movieApi.getMostMovies();
    },
  });

  const { data: dataShowing, isLoading: isLoadingShowing } = useQuery({
    queryKey: ["showing"],
    queryFn: () => {
      return movieApi.getMovies({ status: 1 });
    },
  });

  const { data: dataUpcoming, isLoading: isLoadingUpcoming } = useQuery({
    queryKey: ["upcoming"],
    queryFn: () => {
      return movieApi.getMovies({ status: 2 });
    },
    staleTime: 3 * 60 * 1000,
  });

  const navigateToListShowing = () => {
    navigation.navigate("ListMovie", { title: "Showing", status: 1 });
  };

  const navigateToListUpcoming = () => {
    navigation.navigate("ListMovie", { title: "Upcoming", status: 2 });
  };

  useEffect(() => {
    setTrending(dataTrending?.data.data as Movie[]);
  }, [dataTrending]);
  useEffect(() => {
    setShowing(dataShowing?.data.data as Movie[]);
  }, [dataShowing]);
  useEffect(() => {
    setUpcoming(dataUpcoming?.data.data as Movie[]);
  }, [dataUpcoming]);

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
        <ExpoStatusBar style="dark" />
        <View className="flex-row justify-between items-center mx-4">
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Bars3CenterLeftIcon size="30" strokeWidth={2} color="#AE1F17" />
          </TouchableOpacity>
          <Image source={require("../assets/logo.png")} />
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon size={30} strokeWidth={2} color="#AE1F17" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        <TrendingMovies data={trending} isLoading={isLoadingTrending} />
        <MovieList
          key="showing"
          title="Showing"
          data={showing}
          isLoading={isLoadingShowing}
          handleViewAll={navigateToListShowing}
        />
        <MovieList
          key="upcoming"
          title="Upcoming"
          data={upcoming}
          isLoading={isLoadingUpcoming}
          handleViewAll={navigateToListUpcoming}
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
