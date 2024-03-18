import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";

import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

//Screens
import { AppContext, AppProvider } from "contexts/app.context";
import SplashScreen from "screens/Splash";
import LoginScreen from "screens/Login";
import RegisterScreen from "screens/Register";
import ConfirmRegisterScreen from "screens/ConfirmRegister";
import ForgotPasswordScreen from "screens/ForgotPassword";
import CreateNewPasswordScreen from "screens/CreateNewPassword";
import HomeScreen from "screens/Home";
import MovieScreen from "screens/Movie";
import SearchScreen from "screens/Search";
import ListMovieScreen from "screens/ListMovie";
import ShowtimeScreen from "screens/Showtime";
import BookTicketScreen from "screens/BookTicket";
import ListComboScreen from "screens/ListCombo";
import PaymentScreen from "screens/Payment";

import Toast, {
  BaseToastProps,
  ErrorToast,
  InfoToast,
  SuccessToast,
} from "react-native-toast-message";
import { eventEmitter } from "utils/auth";
import CustomDrawer from "components/CustomDrawer";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function App(): JSX.Element {
  const { reset } = useContext(AppContext);
  const Drawer = createDrawerNavigator();

  const toastConfig = {
    success: (props: BaseToastProps) => (
      <SuccessToast {...props} text1NumberOfLines={2} />
    ),
    error: (props: BaseToastProps) => (
      <ErrorToast {...props} text1NumberOfLines={2} />
    ),
    info: (props: BaseToastProps) => (
      <InfoToast {...props} text1NumberOfLines={2} />
    ),
  };

  useEffect(() => {
    eventEmitter.addListener("clearLS", reset);
    return () => {
      eventEmitter.removeAllListeners("clearLS");
    };
  }, [reset]);

  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <NavigationContainer>
          <Drawer.Navigator
            drawerContent={() => <CustomDrawer />}
            screenOptions={{
              headerShown: false,
            }}
          >
            <Drawer.Screen name="Splash" component={SplashScreen} />
            <Drawer.Screen name="Login" component={LoginScreen} />
            <Drawer.Screen name="Register" component={RegisterScreen} />
            <Drawer.Screen
              name="ConfirmRegister"
              component={ConfirmRegisterScreen}
            />
            <Drawer.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            />
            <Drawer.Screen
              name="CreateNewPassword"
              component={CreateNewPasswordScreen}
            />
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Movie" component={MovieScreen} />
            <Drawer.Screen name="Search" component={SearchScreen} />
            <Drawer.Screen name="ListMovie" component={ListMovieScreen} />
            <Drawer.Screen name="Showtime" component={ShowtimeScreen} />
            <Drawer.Screen name="BookTicket" component={BookTicketScreen} />
            <Drawer.Screen name="ListCombo" component={ListComboScreen} />
            <Drawer.Screen name="Payment" component={PaymentScreen} />
          </Drawer.Navigator>
          <Toast config={toastConfig} />
        </NavigationContainer>
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
