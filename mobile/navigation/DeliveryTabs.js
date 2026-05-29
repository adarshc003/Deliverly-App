import React from "react";

import {
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import {
  Ionicons,
} from "@expo/vector-icons";

import DeliveryDashboard from "../screens/DeliveryDashboard";

import ProfileScreen from "../screens/ProfileScreen";

const Tab =
  createBottomTabNavigator();

export default function DeliveryTabs() {

  return (

    <Tab.Navigator

      screenOptions={({ route }) => ({

        headerShown: false,

        tabBarActiveTintColor: "#22C55E",

        tabBarInactiveTintColor: "#777",

        tabBarStyle: {
          height: 68,
          paddingBottom: 8,
          paddingTop: 8,
          backgroundColor: "#111",
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

          if (
            route.name === "Dashboard"
          ) {

            iconName = "car";

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
        name="Dashboard"
        component={DeliveryDashboard}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />

    </Tab.Navigator>

  );
}