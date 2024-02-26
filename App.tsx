import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Screens
import { AppContext, AppProvider } from "contexts/app.context";
import SplashScreen from "screens/Splash";
import LoginScreen from "screens/Login";
import RegisterScreen from "screens/Register";
import ForgotPasswordScreen from "screens/ForgotPassword";
import ConfirmRegisterScreen from "screens/ConfirmRegister";
import ConfirmForgotPasswordScreen from "screens/ConfirmForgotPassword";
import CreateNewPasswordScreen from "screens/CreateNewPassword";
import HomeScreen from "screens/Home";
import MovieScreen from "screens/Movie";
import Toast from "react-native-toast-message";
import { eventEmitter } from "utils/auth";

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
  const Stack = createNativeStackNavigator();

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
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            />
            <Stack.Screen
              name="ConfirmRegister"
              component={ConfirmRegisterScreen}
            />
            <Stack.Screen
              name="ConfirmForgotPassword"
              component={ConfirmForgotPasswordScreen}
            />
            <Stack.Screen
              name="CreateNewPassword"
              component={CreateNewPasswordScreen}
            />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Movie" component={MovieScreen} />
          </Stack.Navigator>
          <Toast />
        </NavigationContainer>
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
