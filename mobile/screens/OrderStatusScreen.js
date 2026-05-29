import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import API from "../services/api";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function OrderStatusScreen({
  navigation,
}) {

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchOrders = async () => {

    try {

const token =
  await AsyncStorage.getItem(
    "token"
  );

const response =
  await API.get("/orders", {
    headers: {
      Authorization:
        `Bearer ${token}`,
    },
  });

      setOrders(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    fetchOrders();

  }, []);

  const getStatusColor = (status) => {

    switch (status) {

      case "Pending":
        return "#F59E0B";

      case "Accepted":
        return "#3B82F6";

      case "Picked Up":
        return "#8B5CF6";

      case "Delivered":
        return "#22C55E";

      default:
        return "#111";

    }
  };

  if (loading) {

    return (

      <View style={styles.loaderContainer}>
        <ActivityIndicator
          size="large"
          color="#111"
        />
      </View>

    );
  }

  return (

    <ScrollView style={styles.container}>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Home")
        }
      >
        <Text style={styles.back}>
          ← Back
        </Text>
      </TouchableOpacity>

      <Text style={styles.title}>
        Your Orders 🚚
      </Text>

      {orders.length === 0 ? (

        <Text style={styles.empty}>
          No orders found
        </Text>

      ) : (

        orders.map((order) => (

          <View
            key={order._id}
            style={styles.card}
          >

            <Text style={styles.item}>
              {order.item}
            </Text>

            <Text style={styles.name}>
              Customer:
              {" "}
              {order.customerName}
            </Text>

            <Text style={styles.address}>
              {order.address}
            </Text>

            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor:
                    getStatusColor(
                      order.status
                    ),
                },
              ]}
            >

              <Text style={styles.statusText}>
                {order.status}
              </Text>

            </View>

          </View>

        ))

      )}

    </ScrollView>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  back: {
    marginTop: 40,
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#111",
    marginTop: 30,
    marginBottom: 30,
  },

  card: {
    backgroundColor: "#FFF",
    padding: 22,
    borderRadius: 20,
    marginBottom: 18,
  },

  item: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111",
  },

  name: {
    marginTop: 14,
    color: "#666",
    fontSize: 15,
  },

  address: {
    marginTop: 8,
    color: "#666",
    lineHeight: 22,
  },

  statusBadge: {
    marginTop: 18,
    alignSelf: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 30,
  },

  statusText: {
    color: "#FFF",
    fontWeight: "700",
  },

  empty: {
    marginTop: 60,
    textAlign: "center",
    color: "#666",
    fontSize: 16,
  },

});