import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Toast from "react-native-toast-message";

export default function ProfileScreen({
  navigation,
}) {

  const [user, setUser] =
    useState(null);

  useEffect(() => {

    const getUser = async () => {

      const storedUser =
        await AsyncStorage.getItem(
          "user"
        );

      if (storedUser) {

        setUser(
          JSON.parse(storedUser)
        );

      }
    };

    getUser();

  }, []);

  const handleLogout = async () => {

    await AsyncStorage.removeItem(
      "token"
    );

    await AsyncStorage.removeItem(
      "user"
    );

    Toast.show({
      type: "success",
      text1: "Logged out",
    });

    navigation.replace("Landing");

  };

  const isDelivery =
    user?.role === "delivery";

  return (

    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor:
            isDelivery
              ? "#0F0F0F"
              : "#F5F5F5",
        },
      ]}
    >

      <Text
        style={[
          styles.heading,
          {
            color: isDelivery
              ? "#FFF"
              : "#111",
          },
        ]}
      >
        My Profile
      </Text>

      {/* PROFILE CARD */}

      <View
        style={[
          styles.profileCard,
          {
            backgroundColor:
              isDelivery
                ? "#181818"
                : "#111",
          },
        ]}
      >

        <View
          style={[
            styles.avatar,
            {
              backgroundColor:
                isDelivery
                  ? "#16A34A"
                  : "#FFF",
            },
          ]}
        >

          <Text
            style={[
              styles.avatarText,
              {
                color:
                  isDelivery
                    ? "#FFF"
                    : "#111",
              },
            ]}
          >
            {user?.name
              ?.charAt(0)
              ?.toUpperCase()}
          </Text>

        </View>

        <Text style={styles.name}>
          {user?.name}
        </Text>

        <Text style={styles.role}>
          {isDelivery
            ? "Delivery Partner 🚚"
            : "Customer 🛒"}
        </Text>

      </View>

      {/* EMAIL */}

      <View
        style={[
          styles.infoCard,
          {
            backgroundColor:
              isDelivery
                ? "#181818"
                : "#FFF",
          },
        ]}
      >

        <Text style={styles.label}>
          Email
        </Text>

        <Text
          style={[
            styles.value,
            {
              color: isDelivery
                ? "#FFF"
                : "#111",
            },
          ]}
        >
          {user?.email}
        </Text>

      </View>

      {/* ACCOUNT TYPE */}

      <View
        style={[
          styles.infoCard,
          {
            backgroundColor:
              isDelivery
                ? "#181818"
                : "#FFF",
          },
        ]}
      >

        <Text style={styles.label}>
          Account Type
        </Text>

        <Text
          style={[
            styles.value,
            {
              color: isDelivery
                ? "#FFF"
                : "#111",
            },
          ]}
        >
          {user?.role}
        </Text>

      </View>

      {/* LOGOUT */}

      <TouchableOpacity
        style={[
          styles.logoutButton,
          {
            backgroundColor:
              isDelivery
                ? "#16A34A"
                : "#111",
          },
        ]}
        onPress={handleLogout}
      >

        <Text style={styles.logoutText}>
          Logout
        </Text>

      </TouchableOpacity>

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 24,
  },

  heading: {
    marginTop: 40,
    fontSize: 34,
    fontWeight: "800",
  },

  profileCard: {
    borderRadius: 30,
    padding: 32,
    marginTop: 30,
    alignItems: "center",
  },

  avatar: {
    width: 95,
    height: 95,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    fontSize: 38,
    fontWeight: "800",
  },

  name: {
    marginTop: 22,
    fontSize: 28,
    fontWeight: "800",
    color: "#FFF",
  },

  role: {
    marginTop: 8,
    fontSize: 15,
    color: "#CCC",
  },

  infoCard: {
    padding: 24,
    borderRadius: 22,
    marginTop: 20,
  },

  label: {
    color: "#888",
    fontSize: 14,
  },

  value: {
    marginTop: 10,
    fontSize: 19,
    fontWeight: "700",
  },

  logoutButton: {
    marginTop: "auto",
    padding: 18,
    borderRadius: 20,
    marginBottom: 30,
  },

  logoutText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "800",
  },

});