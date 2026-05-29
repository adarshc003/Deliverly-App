import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";

import API from "../services/api";

import {
  validateName,
  validateEmail,
  validatePassword,
  validateEmployeeId,
} from "../services/validation";

import Toast from "react-native-toast-message";

export default function DeliveryRegisterScreen({
  navigation,
}) {

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [errors, setErrors] =
  useState({});

  const [password, setPassword] =
    useState("");

  const [employeeId, setEmployeeId] =
    useState("");

  const [accessKey, setAccessKey] =
    useState("");

  const handleRegister = async () => {

    const newErrors = {};

if (!validateName(name)) {

  newErrors.name =
    "Enter first and last name";

}

if (!validateEmail(email)) {

  newErrors.email =
    "Enter valid Gmail address";

}

if (!validatePassword(password)) {

  newErrors.password =
    "Password minimum 6 characters";

}

if (
  !validateEmployeeId(employeeId)
) {

  newErrors.employeeId =
    "Format: EMP1234";

}

if (!accessKey) {

  newErrors.accessKey =
    "Access key required";

}

setErrors(newErrors);

if (
  Object.keys(newErrors).length > 0
) {
  return;
}

    try {

      const response = await API.post(
        "/auth/register",
        {
          name,
          email,
          password,
          employeeId,
          accessKey,
          role: "delivery",
        }
      );

Toast.show({
  type: "success",
  text1:
    "Delivery Partner Registered 🚚",
});

      navigation.navigate(
        "DeliveryLogin"
      );

    } catch (error) {

Toast.show({
  type: "error",
  text1: "Registration Failed",
  text2:
    error.response?.data?.message,
});

    }
  };

  return (

    <SafeAreaView style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
      >

        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              "DeliveryLogin"
            )
          }
        >
          <Text style={styles.back}>
            ← Back
          </Text>
        </TouchableOpacity>

        <View style={styles.content}>

          <Text style={styles.title}>
            Become a Delivery Partner
          </Text>

          <Text style={styles.subtitle}>
            Authorized onboarding only 🚚
          </Text>

          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#888"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />

          {errors.name && (
  <Text style={styles.error}>
    {errors.name}
  </Text>
)}

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

          <TextInput
            placeholder="Employee ID"
            placeholderTextColor="#888"
            style={styles.input}
            value={employeeId}
            onChangeText={setEmployeeId}
          />

          {errors.employeeId && (
  <Text style={styles.error}>
    {errors.employeeId}
  </Text>
)}

          <TextInput
            placeholder="Access Key"
            placeholderTextColor="#888"
            style={styles.input}
            value={accessKey}
            onChangeText={setAccessKey}
          />

          {errors.accessKey && (
  <Text style={styles.error}>
    {errors.accessKey}
  </Text>
)}

          <TouchableOpacity
            style={styles.button}
            onPress={handleRegister}
          >
            <Text style={styles.buttonText}>
              Register
            </Text>
          </TouchableOpacity>

        </View>

      </ScrollView>

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
    paddingBottom: 50,
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#FFF",
    marginTop: 40,
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

  error: {
  color: "#EF4444",
  marginBottom: 12,
  marginLeft: 6,
  fontSize: 13,
},

});