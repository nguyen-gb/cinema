import React, { useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { View, Text } from "react-native";
import { AppContext, getInitialAppContext } from "contexts/app.context";

export default function SplashScreen() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext);
  const navigation = useNavigation<any>();

  useEffect(() => {
    const fetchData = async () => {
      const initialContext = await getInitialAppContext();
      setIsAuthenticated(initialContext.isAuthenticated);
      setProfile(initialContext.profile);
      if (initialContext.isAuthenticated) {
        navigation.navigate("Home");
      } else {
        navigation.navigate("Login");
      }
    };
    fetchData();
  }, []);

  return (
    <View>
      <Text>Splash</Text>
    </View>
  );
}
