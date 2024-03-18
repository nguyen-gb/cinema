import React, { useContext } from "react";
import { ChevronRightIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { AppContext } from "contexts/app.context";
import { useMutation } from "@tanstack/react-query";
import authApi from "apis/auth.api";

export default function CustomDrawer() {
  const { profile, isAuthenticated, setIsAuthenticated, setProfile } =
    useContext(AppContext);
  const navigation = useNavigation<any>();

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setIsAuthenticated(false);
      setProfile(null);
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <View className="flex-1 bg-[#33383F]">
      <View className="w-full">
        <Image
          className="w-full object-contain"
          source={require("../assets/thumbnail_drawer.png")}
        />
      </View>
      <View className="w-full flex-col justify-center items-center">
        <Image
          className="-mt-[35px] mb-2"
          source={require("../assets/avatar_drawer.png")}
        />
        <Text className="text-base font-semibold text-white">
          {profile?.name ?? "Guest"}
        </Text>
        <Text className="text-sm font-normal text-[#EE9324]">
          {profile?.email && profile?.email.length > 30
            ? profile?.email.slice(0, 30) + "..."
            : profile?.email}
        </Text>
      </View>
      <DrawerContentScrollView>
        {isAuthenticated ? (
          <View className="flex-col px-4">
            <TouchableOpacity
              onPress={() => navigation.navigate("Home")}
              className="flex-row items-center p-2"
            >
              <Text className="text-base font-semibold text-white min-w-[170px]">
                Home
              </Text>
              <ChevronRightIcon size="22" strokeWidth={2} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("MyAccount")}
              className="flex-row items-center p-2"
            >
              <Text className="text-base font-semibold text-white min-w-[170px]">
                My Account
              </Text>
              <ChevronRightIcon size="22" strokeWidth={2} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("PurchaseHistory")}
              className="flex-row items-center p-2"
            >
              <Text className="text-base font-semibold text-white min-w-[170px]">
                Purchase History
              </Text>
              <ChevronRightIcon size="22" strokeWidth={2} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("BonusPointsHistory")}
              className="flex-row items-center p-2"
            >
              <Text className="text-base font-semibold text-white min-w-[170px]">
                Bonus Points History
              </Text>
              <ChevronRightIcon size="22" strokeWidth={2} color="white" />
            </TouchableOpacity>
          </View>
        ) : (
          <View className="flex-col px-4">
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              className="flex-row items-center p-2"
            >
              <Text className="text-base font-semibold text-white min-w-[100px]">
                Login
              </Text>
              <ChevronRightIcon size="22" strokeWidth={2} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Register")}
              className="flex-row items-center p-2"
            >
              <Text className="text-base font-semibold text-white min-w-[100px]">
                Register
              </Text>
              <ChevronRightIcon size="22" strokeWidth={2} color="white" />
            </TouchableOpacity>
          </View>
        )}
      </DrawerContentScrollView>
      <TouchableOpacity onPress={handleLogout} className="p-6">
        <Text className="text-center text-base font-semibold text-white">
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}
