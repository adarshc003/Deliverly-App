import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import MapView, {
  Marker,
} from "react-native-maps";

import API from "../services/api";

export default function
LiveTrackingScreen({
  route,
}) {

  const { orderId } =
    route.params;

  const [order, setOrder] =
    useState(null);

  const fetchOrder =
    async () => {

    try {

      const response =
        await API.get("/orders");

      const foundOrder =
        response.data.find(
          (o) => o._id === orderId
        );

      setOrder(foundOrder);

    } catch (error) {

      console.log(error);

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

  if (
    !order ||
    !order.customerLocation
  ) {

    return (
      <View style={styles.loader}>
        <ActivityIndicator
          size="large"
          color="#111"
        />
      </View>
    );
  }

  return (

    <MapView
      style={styles.map}
      initialRegion={{
        latitude:
          order.customerLocation.latitude,

        longitude:
          order.customerLocation.longitude,

        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >

      {/* CUSTOMER */}

      <Marker
        coordinate={{
          latitude:
            order.customerLocation.latitude,

          longitude:
            order.customerLocation.longitude,
        }}

        title="Customer"
      />

      {/* DELIVERY */}

      {order.deliveryLocation
        ?.latitude && (

        <Marker
          coordinate={{
            latitude:
              order.deliveryLocation.latitude,

            longitude:
              order.deliveryLocation.longitude,
          }}

          pinColor="green"

          title="Delivery Partner"
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
  },

});