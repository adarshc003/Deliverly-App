import React from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  StatusBar,
} from "react-native";

export default function LandingScreen({
  navigation,
}) {

  const products = [

    {
      id: 1,
      name: "Burger Combo",
      price: "₹199",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    },

    {
      id: 2,
      name: "Pizza Meal",
      price: "₹299",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591",
    },

    {
      id: 3,
      name: "Fried Chicken",
      price: "₹249",
      image:
        "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?q=80&w=1200&auto=format&fit=crop",
    },

  ];

  return (

    <SafeAreaView style={styles.container}>

      <StatusBar
        barStyle="dark-content"
      />

      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
      >

        {/* HEADER */}

        <View style={styles.header}>

          <View>

            <Text style={styles.logo}>
              Deliverly
            </Text>

            <Text style={styles.tagline}>
              Fast delivery at your
              doorstep 🚀
            </Text>

          </View>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() =>
              navigation.navigate(
                "CustomerLogin"
              )
            }
          >

            <Text style={styles.loginText}>
              Login
            </Text>

          </TouchableOpacity>

        </View>

        {/* HERO */}

        <View style={styles.hero}>

          <Text style={styles.heroTitle}>
            Delicious food,
            delivered fast.
          </Text>

          <Text style={styles.heroSubtitle}>
            Order your favorite meals
            with real-time delivery
            tracking and smooth order
            management.
          </Text>

          <TouchableOpacity
            style={styles.heroButton}
            onPress={() =>
              navigation.navigate(
                "CustomerRegister"
              )
            }
          >

            <Text
              style={styles.heroButtonText}
            >
              Order Now
            </Text>

          </TouchableOpacity>

        </View>

        {/* PRODUCTS */}

        <Text style={styles.sectionTitle}>
          Popular Items
        </Text>

        {products.map((item) => (

          <View
            key={item.id}
            style={styles.card}
          >

            <Image
              source={{
                uri: item.image,
              }}
              style={styles.image}
            />

            <View
              style={styles.cardContent}
            >

              <Text
                style={styles.productName}
              >
                {item.name}
              </Text>

              <Text style={styles.price}>
                {item.price}
              </Text>

            </View>

          </View>

        ))}

        {/* DELIVERY PORTAL */}

        <TouchableOpacity
          style={styles.deliveryPortal}
          onPress={() =>
            navigation.navigate(
              "DeliveryLogin"
            )
          }
        >

          <View>

            <Text style={styles.portalHeading}>
              Delivery Partner Portal
            </Text>

            <Text style={styles.portalDescription}>
              Continue to delivery
              dashboard and order
              management.
            </Text>

          </View>

          <Text style={styles.portalArrow}>
            →
          </Text>

        </TouchableOpacity>

      </ScrollView>

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },

  header: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
    paddingHorizontal: 22,
    paddingTop: 60,
  },

  logo: {
    fontSize: 36,
    fontWeight: "900",
    color: "#111",
    letterSpacing: -1,
  },

  tagline: {
    marginTop: 6,
    color: "#666",
    fontSize: 14,
  },

  loginButton: {
    backgroundColor: "#111",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
  },

  loginText: {
    color: "#FFF",
    fontWeight: "700",
  },

  hero: {
    paddingHorizontal: 22,
    marginTop: 50,
    marginBottom: 40,
  },

  heroTitle: {
    fontSize: 42,
    fontWeight: "800",
    color: "#111",
    lineHeight: 52,
  },

  heroSubtitle: {
    marginTop: 18,
    fontSize: 16,
    color: "#666",
    lineHeight: 26,
  },

  heroButton: {
    backgroundColor: "#111",
    marginTop: 30,
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: "center",
  },

  heroButtonText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111",
    marginHorizontal: 22,
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#FFF",
    marginHorizontal: 22,
    marginBottom: 22,
    borderRadius: 24,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: 210,
  },

  cardContent: {
    padding: 18,
  },

  productName: {
    fontSize: 21,
    fontWeight: "700",
    color: "#111",
  },

  price: {
    marginTop: 8,
    color: "#22C55E",
    fontWeight: "700",
    fontSize: 16,
  },

  deliveryPortal: {
    backgroundColor: "#111",
    marginHorizontal: 22,
    marginTop: 10,
    marginBottom: 40,
    borderRadius: 24,
    padding: 22,
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
  },

  portalHeading: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "800",
  },

  portalDescription: {
    color: "#CCC",
    marginTop: 8,
    fontSize: 14,
    lineHeight: 22,
    maxWidth: 240,
  },

  portalArrow: {
    color: "#FFF",
    fontSize: 30,
    fontWeight: "300",
  },

});