import React from "react";

import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LandingScreen from "../screens/LandingScreen";

import CustomerLoginScreen from "../screens/CustomerLoginScreen";
import CustomerRegisterScreen from "../screens/CustomerRegisterScreen";

import DeliveryLoginScreen from "../screens/DeliveryLoginScreen";
import DeliveryRegisterScreen from "../screens/DeliveryRegisterScreen";

import HomeScreen from "../screens/HomeScreen";
import DeliveryDashboard from "../screens/DeliveryDashboard";

import PlaceOrderScreen from "../screens/PlaceOrderScreen";
import OrderStatusScreen from "../screens/OrderStatusScreen";
import CustomerTabs from "./CustomerTabs";
import DeliveryTabs from "./DeliveryTabs";
import SplashScreen from "../screens/SplashScreen";
import LiveTrackingScreen from "../screens/LiveTrackingScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {

  return (

    <NavigationContainer>

      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >

          <Stack.Screen
    name="Splash"
    component={SplashScreen}
  />

        <Stack.Screen
          name="Landing"
          component={LandingScreen}
        />

        <Stack.Screen
          name="CustomerLogin"
          component={CustomerLoginScreen}
        />

        <Stack.Screen
          name="CustomerRegister"
          component={CustomerRegisterScreen}
        />

        <Stack.Screen
          name="DeliveryLogin"
          component={DeliveryLoginScreen}
        />

        <Stack.Screen
          name="DeliveryRegister"
          component={DeliveryRegisterScreen}
        />

        <Stack.Screen
          name="Home"
          component={CustomerTabs}
        />

        <Stack.Screen
          name="DeliveryDashboard"
          component={DeliveryTabs}
        />
        <Stack.Screen
  name="PlaceOrder"
  component={PlaceOrderScreen}
/>

<Stack.Screen
  name="OrderStatus"
  component={OrderStatusScreen}
/>

<Stack.Screen
  name="LiveTracking"
  component={LiveTrackingScreen}
/>

      </Stack.Navigator>

    </NavigationContainer>

  );
}