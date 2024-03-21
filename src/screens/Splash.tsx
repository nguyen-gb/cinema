import React, { useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import * as Progress from "react-native-progress";
import { View, Text, Platform, Image } from "react-native";
import { AppContext, getInitialAppContext } from "contexts/app.context";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";

const ios = Platform.OS == "ios";

export default function SplashScreen() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext);
  const navigation = useNavigation<any>();

  useEffect(() => {
    const fetchData = async () => {
      const initialContext = await getInitialAppContext();
      setIsAuthenticated(initialContext.isAuthenticated);
      setProfile(initialContext.profile);
      setTimeout(() => {
        navigation.navigate("Home");
      }, 3000);
    };
    fetchData();
  }, []);

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
        <ExpoStatusBar style="dark" />
        <View className="h-full flex-col justify-center items-center mx-4">
          <Image height={24} source={require("../assets/logo_splash.png")} />
          <Text className="text-[#1A1D1F] text-xl font-[900] mt-[20px]">
            CULTUREPLEX
          </Text>
          <Progress.CircleSnail
            color="#FAB8B7"
            className="mt-[42px] text-red"
          />
        </View>
      </SafeAreaView>
      <View className="fixed bottom-[124px] flex justify-center items-center">
        <Text className="text-[#1A1D1F] text-xs">LOADING...</Text>
        <Text className="text-[#1A1D1F] text-xs">Please wait a second</Text>
      </View>
    </View>
  );
}
