import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import API from "../services/api";

import Toast from "react-native-toast-message";

import * as Location from "expo-location";

import {
  Linking,
} from "react-native";

export default function DeliveryDashboard() {

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

    const [trackingInterval, setTrackingInterval] =
  useState(null);

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

  const interval =
    setInterval(() => {

      fetchOrders();

    }, 5000);

  return () =>
    clearInterval(interval);

}, []);

useEffect(() => {

  return () => {

    if (trackingInterval) {

      clearInterval(
        trackingInterval
      );

    }

  };

}, [trackingInterval]);

  // ACCEPT ORDER
  const acceptOrder = async (id) => {

    try {

      const token =
        await AsyncStorage.getItem(
          "token"
        );

      await API.put(
        `/orders/accept/${id}`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

Toast.show({
  type: "success",
  text1: "Order Accepted 🚚",
});

      fetchOrders();

    } catch (error) {

Toast.show({
  type: "error",
  text1: "Accept Failed",
  text2: "Could not accept order",
});

    }
  };

  const rejectOrder = async (id) => {

  try {

    const token =
      await AsyncStorage.getItem(
        "token"
      );

    await API.put(
      `/orders/reject/${id}`,
      {},
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

Toast.show({
  type: "info",
  text1: "Order Rejected",
});

    fetchOrders();

  } catch (error) {

Toast.show({
  type: "error",
  text1: "Reject Failed",
  text2: "Could not reject order",
});

  }
};


const sendLiveLocation =
  async (orderId) => {

  try {

    const { status } =
      await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      return;
    }

    const location =
      await Location.getCurrentPositionAsync({});

    const token =
      await AsyncStorage.getItem(
        "token"
      );

    await API.put(
      `/orders/location/${orderId}`,
      {
        latitude:
          location.coords.latitude,

        longitude:
          location.coords.longitude,
      },
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  } catch (error) {

    console.log(error);

  }
};

const startLiveTracking =
  (orderId) => {

  if (trackingInterval) {

    clearInterval(
      trackingInterval
    );

  }

  const interval =
    setInterval(async () => {

      await sendLiveLocation(
        orderId
      );

      console.log(
        "Live location updated"
      );

    }, 5000);

  setTrackingInterval(
    interval
  );
};

  // UPDATE STATUS
  const updateStatus = async (
    id,
    status
  ) => {

    try {

      const token =
        await AsyncStorage.getItem(
          "token"
        );
if (status === "Picked Up") {

  await sendLiveLocation(id);

  startLiveTracking(id);

}

if (
  status === "Delivered" &&
  trackingInterval
) {

  clearInterval(
    trackingInterval
  );

  setTrackingInterval(
    null
  );

}

      await API.put(
        `/orders/status/${id}`,
        { status },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

Toast.show({
  type: "success",
  text1: `Order ${status} ✅`,
});

      fetchOrders();

    } catch (error) {

Toast.show({
  type: "error",
  text1: "Update Failed",
  text2: "Could not update status",
});

    }
  };

  if (loading) {

    return (

      <View style={styles.loader}>
        <ActivityIndicator
          size="large"
          color="#22C55E"
        />
      </View>

    );
  }


  const openRouteMap =
  (order) => {

  if (
    !order.customerLocation
  ) {

    Toast.show({
      type: "error",
      text1:
        "Customer location not available",
    });

    return;
  }

  const latitude =
    order.customerLocation.latitude;

  const longitude =
    order.customerLocation.longitude;

  const url =
`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

  Linking.openURL(url);
};

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.title}>
        Delivery Dashboard 🚚
      </Text>

      {orders.map((order) => (

        <View
          key={order._id}
          style={styles.card}
        >

          <Text style={styles.item}>
            {order.item}
          </Text>

          <Text style={styles.name}>
            {order.customerName}
          </Text>

          <Text style={styles.phone}>
  📞 {order.phone}
</Text>

          <Text style={styles.address}>
            {order.address}
          </Text>

          <Text style={styles.status}>
            Status:
            {" "}
            {order.status}
          </Text>

          {order.customerLocation && (

<TouchableOpacity
  style={styles.routeButton}

  onPress={() =>
    openRouteMap(order)
  }
>

<Text style={styles.buttonText}>
  View Route 🗺️
</Text>

</TouchableOpacity>

)}

          {/* ACCEPT BUTTON */}

{order.status === "Pending" && (

  <View style={styles.actionRow}>

    <TouchableOpacity
      style={styles.acceptButton}
      onPress={() =>
        acceptOrder(order._id)
      }
    >

      <Text style={styles.buttonText}>
        Accept
      </Text>

    </TouchableOpacity>

    <TouchableOpacity
      style={styles.rejectButton}
      onPress={() =>
        rejectOrder(order._id)
      }
    >

      <Text style={styles.buttonText}>
        Reject
      </Text>

    </TouchableOpacity>

  </View>

)}

          {/* UPDATE STATUS */}

          {order.status === "Accepted" && (

            <TouchableOpacity
              style={styles.updateButton}
              onPress={() =>
                updateStatus(
                  order._id,
                  "Picked Up"
                )
              }
            >

              <Text style={styles.buttonText}>
                Mark Picked Up
              </Text>

            </TouchableOpacity>

          )}

          {order.status === "Picked Up" && (

            <TouchableOpacity
              style={styles.deliveredButton}
              onPress={() =>
                updateStatus(
                  order._id,
                  "Delivered"
                )
              }
            >

              <Text style={styles.buttonText}>
                Mark Delivered
              </Text>

            </TouchableOpacity>

          )}

        </View>

      ))}

    </ScrollView>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#111",
    padding: 20,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111",
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#FFF",
    marginTop: 60,
    marginBottom: 30,
  },

  card: {
    backgroundColor: "#1E1E1E",
    padding: 22,
    borderRadius: 22,
    marginBottom: 20,
  },

  item: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFF",
  },

  name: {
    marginTop: 12,
    color: "#DDD",
    fontSize: 15,
  },

  phone: {
  marginTop: 8,
  color: "#22C55E",
  fontWeight: "600",
},

  address: {
    marginTop: 8,
    color: "#AAA",
    lineHeight: 22,
  },

  status: {
    marginTop: 16,
    color: "#22C55E",
    fontWeight: "700",
    fontSize: 15,
  },

acceptButton: {
  backgroundColor: "#3B82F6",
  padding: 16,
  borderRadius: 14,
  width: "48%",
  alignItems: "center",
},

  actionRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 18,
},

rejectButton: {
  backgroundColor: "#EF4444",
  padding: 16,
  borderRadius: 14,
  width: "48%",
  alignItems: "center",
},

  updateButton: {
    backgroundColor: "#8B5CF6",
    padding: 16,
    borderRadius: 14,
    marginTop: 18,
  },

  deliveredButton: {
    backgroundColor: "#22C55E",
    padding: 16,
    borderRadius: 14,
    marginTop: 18,
  },

  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "700",
  },

  routeButton: {
  backgroundColor: "#2563EB",
  padding: 14,
  borderRadius: 14,
  marginTop: 14,
},

});