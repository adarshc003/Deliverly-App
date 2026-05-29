import React from "react";

import {
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import {
  Ionicons,
} from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";

import OrderStatusScreen from "../screens/OrderStatusScreen";

import ProfileScreen from "../screens/ProfileScreen";

const Tab =
  createBottomTabNavigator();

export default function CustomerTabs() {

  return (

    <Tab.Navigator

      screenOptions={({ route }) => ({

        headerShown: false,

        tabBarActiveTintColor: "#111",

        tabBarInactiveTintColor: "#888",

        tabBarStyle: {
          height: 68,
          paddingBottom: 8,
          paddingTop: 8,
          backgroundColor: "#FFF",
          borderTopWidth: 0,
          elevation: 10,
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },

        tabBarIcon: ({
          color,
          size,
        }) => {

          let iconName;

          if (route.name === "HomeTab") {

            iconName = "home";

          } else if (
            route.name === "Orders"
          ) {

            iconName = "receipt";

          } else if (
            route.name === "Profile"
          ) {

            iconName = "person";

          }

          return (

            <Ionicons
              name={iconName}
              size={22}
              color={color}
            />

          );
        },

      })}

    >

      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          title: "Home",
        }}
      />

      <Tab.Screen
        name="Orders"
        component={OrderStatusScreen}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />

    </Tab.Navigator>

  );
}