import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import API from "../services/api";

import {
  validateEmail,
  validatePassword,
} from "../services/validation";

import Toast from "react-native-toast-message";

export default function DeliveryLoginScreen({
  navigation,
}) {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [errors, setErrors] =
    useState({});

  const handleLogin = async () => {

    const newErrors = {};

    if (!validateEmail(email)) {

      newErrors.email =
        "Enter valid Gmail address";

    }

    if (!validatePassword(password)) {

      newErrors.password =
        "Password must contain 6 characters";

    }

    setErrors(newErrors);

    if (
      Object.keys(newErrors).length > 0
    ) {

      return;

    }

    try {

      const response =
        await API.post(
          "/auth/login",
          {
            email,
            password,
          }
        );

      const { token, user } =
        response.data;

      // ROLE VALIDATION
      if (
        user.role !== "delivery"
      ) {

        Toast.show({
          type: "error",
          text1: "Access Denied",
          text2:
            "Not a delivery account",
        });

        return;

      }

      // SAVE TOKEN
      await AsyncStorage.setItem(
        "token",
        token
      );

      // SAVE USER
      await AsyncStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      // SAVE ROLE
      await AsyncStorage.setItem(
        "role",
        "delivery"
      );

      Toast.show({
        type: "success",
        text1:
          "Login Successful 🚚",
      });

      navigation.navigate(
        "DeliveryDashboard"
      );

    } catch (error) {

      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2:
          error.response?.data
            ?.message ||
          "Invalid credentials",
      });

    }
  };

  return (

    <SafeAreaView style={styles.container}>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Landing")
        }
      >

        <Text style={styles.back}>
          ← Back
        </Text>

      </TouchableOpacity>

      <View style={styles.content}>

        <Text style={styles.title}>
          Delivery Partner Login
        </Text>

        <Text style={styles.subtitle}>
          Authorized personnel only 🚚
        </Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#888"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        {errors.email && (

          <Text style={styles.error}>
            {errors.email}
          </Text>

        )}

        <TextInput
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        {errors.password && (

          <Text style={styles.error}>
            {errors.password}
          </Text>

        )}

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
        >

          <Text style={styles.buttonText}>
            Login
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              "DeliveryRegister"
            )
          }
        >

          <Text style={styles.registerText}>
            Become a delivery partner
          </Text>

        </TouchableOpacity>

      </View>

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#111",
    padding: 24,
  },

  back: {
    marginTop: 20,
    fontSize: 16,
    color: "#FFF",
    fontWeight: "600",
  },

  content: {
    flex: 1,
    justifyContent: "center",
  },

  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#FFF",
  },

  subtitle: {
    marginTop: 10,
    marginBottom: 40,
    color: "#CCC",
    fontSize: 15,
  },

  input: {
    backgroundColor: "#222",
    padding: 18,
    borderRadius: 16,
    marginBottom: 18,
    fontSize: 15,
    color: "#FFF",
  },

  button: {
    backgroundColor: "#22C55E",
    padding: 18,
    borderRadius: 16,
    marginTop: 10,
  },

  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },

  registerText: {
    marginTop: 24,
    textAlign: "center",
    color: "#FFF",
    fontWeight: "600",
  },

  error: {
    color: "#EF4444",
    marginBottom: 12,
    marginLeft: 6,
    fontSize: 13,
  },

});