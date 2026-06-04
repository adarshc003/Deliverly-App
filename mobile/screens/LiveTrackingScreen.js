import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
} from "react-native";

import MapView, {
  Marker,
  PROVIDER_GOOGLE,
} from "react-native-maps";

import AsyncStorage from "@react-native-async-storage/async-storage";

import API from "../services/api";

export default function
LiveTrackingScreen({
  route,
}) {

  const { orderId } =
    route.params;

  const [order, setOrder] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const fetchOrder =
    async () => {

    try {

      const token =
        await AsyncStorage.getItem(
          "token"
        );

      const response =
        await API.get(
          "/orders",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      const foundOrder =
        response.data.find(
          (o) => o._id === orderId
        );

      setOrder(foundOrder);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    fetchOrder();

    const interval =
      setInterval(() => {

        fetchOrder();

      }, 5000);

    return () =>
      clearInterval(interval);

  }, []);

  if (loading) {

    return (

      <View style={styles.loader}>

        <ActivityIndicator
          size="large"
          color="#111"
        />

      </View>

    );
  }

  if (
    !order ||
    !order.customerLocation
  ) {

    return (

      <View style={styles.loader}>

        <Text style={styles.errorText}>
          Location not available
        </Text>

      </View>

    );
  }

  return (

    <MapView
      style={styles.map}
  provider={PROVIDER_GOOGLE}
      region={{
        latitude:
          order.deliveryLocation
            ?.latitude ||
          order.customerLocation
            .latitude,

        longitude:
          order.deliveryLocation
            ?.longitude ||
          order.customerLocation
            .longitude,

        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >

      {/* CUSTOMER */}

      <Marker
        coordinate={{
          latitude:
            order.customerLocation
              .latitude,

          longitude:
            order.customerLocation
              .longitude,
        }}

        title="Customer"
        description="Delivery destination"
      />

      {/* DELIVERY PARTNER */}

      {order.deliveryLocation
        ?.latitude && (

        <Marker
          coordinate={{
            latitude:
              order.deliveryLocation
                .latitude,

            longitude:
              order.deliveryLocation
                .longitude,
          }}

          title="Delivery Partner"

          description="Live location"

          pinColor="green"
        />

      )}

    </MapView>

  );
}

const styles =
  StyleSheet.create({

  map: {
    flex: 1,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },

  errorText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "600",
  },

});