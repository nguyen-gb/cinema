import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Screens
import LoginScreen from "screens/Login";
import RegisterScreen from "screens/Register";
import ForgotPasswordScreen from "screens/ForgotPassword";
import ConfirmRegisterScreen from "screens/ConfirmRegister";
import ConfirmForgotPasswordScreen from "screens/ConfirmForgotPassword";
import CreateNewPasswordScreen from "screens/CreateNewPassword";
import HomeScreen from "screens/Home";
import MovieScreen from "screens/Movie";

function App(): JSX.Element {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
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
    </NavigationContainer>
  );
}

export default App;
