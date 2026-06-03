import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import API from "../services/api";

export default function HomeScreen({
  navigation,
}) {

  const [user, setUser] =
    useState(null);

  const [activeOrder, setActiveOrder] =
    useState(null);

  const foodItems = [

    {
      name: "Burger Combo",
      price: 199,
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    },

    {
      name: "Pizza Meal",
      price: 299,
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591",
    },

    {
      name: "Fried Chicken",
      price: 249,
      image:
        "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?q=80&w=1200&auto=format&fit=crop",
    },

  ];

  useEffect(() => {

    const loadData = async () => {

      try {

        const storedUser =
          await AsyncStorage.getItem(
            "user"
          );

        if (storedUser) {

          setUser(
            JSON.parse(storedUser)
          );

        }

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

        const data =
          response.data;

        const latestOrder =
          data.find(
            (order) =>
              order.status !==
              "Delivered"
          );

        if (latestOrder) {

          setActiveOrder(
            latestOrder
          );

        }

      }catch (error) {

  console.log(
    "LOCATION ERROR:",
    error
  );

      }
    };

    loadData();

  }, []);

  return (

    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={
        false
      }
    >

      {/* HEADER */}

      <View style={styles.header}>

        <View>

          <Text style={styles.greeting}>
            Hello {user?.name || "User"} 👋
          </Text>

          <Text style={styles.subText}>
            Ready to order something delicious?
          </Text>

        </View>

      </View>

      {/* ACTIVE ORDER */}

      <View style={styles.activeOrderCard}>

        <Text style={styles.activeTitle}>
          Active Order
        </Text>

        {activeOrder ? (

          <>

            <Text style={styles.orderItem}>
              {activeOrder.item}
            </Text>

            <Text style={styles.orderPrice}>
              ₹{activeOrder.totalPrice}
            </Text>

            <Text style={styles.orderStatus}>
              {activeOrder.status}
            </Text>

          </>

        ) : (

          <Text style={styles.emptyText}>
            No active orders
          </Text>

        )}

      </View>

      {/* FOOD SECTION */}

      <Text style={styles.sectionTitle}>
        Popular Items
      </Text>

      {foodItems.map((item) => (

        <TouchableOpacity
          key={item.name}
          style={styles.foodCard}
          onPress={() =>
            navigation.navigate(
              "PlaceOrder",
              {
                selectedItem:
                  item.name,
                itemPrice:
                  item.price,
              }
            )
          }
        >

          <Image
            source={{
              uri: item.image,
            }}
            style={styles.foodImage}
          />

          <View
            style={styles.foodContent}
          >

            <Text style={styles.foodName}>
              {item.name}
            </Text>

            <Text style={styles.foodPrice}>
              ₹{item.price}
            </Text>

          </View>

        </TouchableOpacity>

      ))}

    </ScrollView>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 22,
  },

  header: {
    marginTop: 60,
    marginBottom: 30,
  },

  greeting: {
    fontSize: 32,
    fontWeight: "800",
    color: "#111",
  },

  subText: {
    marginTop: 8,
    color: "#666",
    fontSize: 15,
  },

  activeOrderCard: {
    backgroundColor: "#111",
    borderRadius: 28,
    padding: 26,
    marginBottom: 34,
  },

  activeTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
  },

  orderItem: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "800",
    marginTop: 20,
  },

  orderPrice: {
    color: "#22C55E",
    marginTop: 10,
    fontSize: 18,
    fontWeight: "700",
  },

  orderStatus: {
    color: "#AAA",
    marginTop: 10,
    fontSize: 15,
  },

  emptyText: {
    color: "#AAA",
    marginTop: 16,
    fontSize: 15,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 20,
    color: "#111",
  },

  foodCard: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    overflow: "hidden",
    marginBottom: 24,
  },

  foodImage: {
    width: "100%",
    height: 210,
  },

  foodContent: {
    padding: 18,
  },

  foodName: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111",
  },

  foodPrice: {
    marginTop: 8,
    color: "#22C55E",
    fontWeight: "700",
    fontSize: 16,
  },

});

