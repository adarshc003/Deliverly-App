import React, {
  useEffect,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SplashScreen({
  navigation,
}) {

  useEffect(() => {

    checkLogin();

  }, []);

  const checkLogin = async () => {

    const token =
      await AsyncStorage.getItem(
        "token"
      );

    const role =
      await AsyncStorage.getItem(
        "role"
      );

    setTimeout(() => {

      if (token && role === "customer") {

        navigation.replace("Home");

      } else if (
        token &&
        role === "delivery"
      ) {

        navigation.replace(
          "DeliveryDashboard"
        );

      } else {

        navigation.replace(
          "Landing"
        );

      }

    }, 2000);

  };

  return (

    <View style={styles.container}>

      <Text style={styles.logo}>
        Deliverly
      </Text>

      <ActivityIndicator
        size="large"
        color="#FFF"
        style={{ marginTop: 30 }}
      />

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111",
  },

  logo: {
    fontSize: 42,
    fontWeight: "900",
    color: "#FFF",
    letterSpacing: 3,
  },

});