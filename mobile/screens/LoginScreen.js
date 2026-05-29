import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";

export default function LoginScreen({ navigation }) {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.container}>

      <StatusBar barStyle="dark-content" />

      <View style={styles.topSection}>
        <Text style={styles.logo}>
          ADDONEZ
        </Text>

        <Text style={styles.subtitle}>
          Delivery Management System
        </Text>
      </View>

      <View style={styles.formContainer}>

        <Text style={styles.heading}>
          Welcome Back 👋
        </Text>

        <Text style={styles.description}>
          Login to continue
        </Text>

        <TextInput
          placeholder="Email Address"
          placeholderTextColor="#999"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          selectionColor="#111"
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            Login
          </Text>
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  topSection: {
    marginBottom: 40,
  },

  logo: {
    fontSize: 36,
    fontWeight: "800",
    color: "#111",
    letterSpacing: 2,
  },

  subtitle: {
    marginTop: 8,
    fontSize: 15,
    color: "#666",
  },

  formContainer: {
    backgroundColor: "#FFF",
    padding: 24,
    borderRadius: 20,
  },

  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111",
  },

  description: {
    marginTop: 6,
    color: "#666",
    marginBottom: 24,
  },

  input: {
    backgroundColor: "#F3F4F6",
    padding: 16,
    borderRadius: 14,
    marginBottom: 16,
    fontSize: 15,
    color: "#111",
  },

  button: {
    backgroundColor: "#111",
    paddingVertical: 18,
    borderRadius: 14,
    marginTop: 10,
  },

  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },

});