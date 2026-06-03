import React, {
  useState,
} from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";

import API from "../services/api";

import Toast from "react-native-toast-message";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {validateName,validatePhone,} from "../services/validation";

import * as Location from "expo-location";

import MapView, {
  Marker,
} from "react-native-maps";

export default function PlaceOrderScreen({
  navigation,
  route,
}) {

  const {
    selectedItem,
    itemPrice,
  } = route.params;

  const [customerName, setCustomerName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [address, setAddress] =
    useState("");

    const [customerLocation,
setCustomerLocation] =
useState(null);

const [mapRegion,
setMapRegion] =
useState(null);

  const [quantity, setQuantity] =
    useState(1);

  const [errors, setErrors] =
    useState({});

  const totalPrice =
    itemPrice * quantity;


    const getCurrentLocation =
  async () => {

  try {

    const { status } =
      await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {

      Toast.show({
        type: "error",
        text1:
          "Location permission denied",
      });

      return;

    }

    const location =
      await Location.getCurrentPositionAsync({});

const coords = {
  latitude:
    location.coords.latitude,

  longitude:
    location.coords.longitude,
};

setCustomerLocation(coords);

setMapRegion({
  ...coords,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
});

    Toast.show({
      type: "success",
      text1:
        "Location fetched successfully 📍",
    });

  } catch (error) {

    Toast.show({
      type: "error",
      text1:
        "Failed to get location",
    });

  }
};

  const handlePlaceOrder = async () => {

    const newErrors = {};

    if (!validateName(customerName)) {

      newErrors.customerName =
        "Enter first and last name";

    }

    if (!validatePhone(phone)) {

      newErrors.phone =
        "Enter valid 10 digit number";

    }

   if (
  address.trim().length < 10 &&
  !customerLocation
) {

  newErrors.address =
    "Add address or use current location";

}

    setErrors(newErrors);

    if (
      Object.keys(newErrors).length > 0
    ) {
      return;
    }

    try {

      const token =
        await AsyncStorage.getItem(
          "token"
        );

      await API.post(
        "/orders",
        {
          customerName,
          phone,
          item: selectedItem,
          itemPrice,
          quantity,
          totalPrice,
          address,
          customerLocation,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      Toast.show({
        type: "success",
        text1:
          "Order placed successfully 🚀",
      });

      navigation.navigate("Home");

    } catch (error) {

      Toast.show({
        type: "error",
        text1:
          "Failed to place order",
      });

    }
  };

  return (

    <SafeAreaView style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
      >

        <Text style={styles.title}>
          Confirm Order
        </Text>

        <View style={styles.itemCard}>

          <Text style={styles.itemName}>
            {selectedItem}
          </Text>

          <Text style={styles.itemPrice}>
            ₹{itemPrice}
          </Text>

        </View>

        {/* QUANTITY */}

        <Text style={styles.label}>
          Quantity
        </Text>

        <View style={styles.quantityRow}>

          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => {

              if (quantity > 1) {

                setQuantity(
                  quantity - 1
                );

              }
            }}
          >

            <Text
              style={
                styles.quantityButtonText
              }
            >
              -
            </Text>

          </TouchableOpacity>

          <Text
            style={styles.quantityText}
          >
            {quantity}
          </Text>

          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() =>
              setQuantity(
                quantity + 1
              )
            }
          >

            <Text
              style={
                styles.quantityButtonText
              }
            >
              +
            </Text>

          </TouchableOpacity>

        </View>

        <Text style={styles.totalPrice}>
          Total: ₹{totalPrice}
        </Text>

        <TextInput
          placeholder="Customer Name"
          placeholderTextColor="#111"
          style={styles.input}
          value={customerName}
          onChangeText={
            setCustomerName
          }
        />

        {errors.customerName && (
          <Text style={styles.error}>
            {errors.customerName}
          </Text>
        )}

        <TextInput
          placeholder="Mobile Number"
          placeholderTextColor="#111"
          keyboardType="phone-pad"
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
        />

        {errors.phone && (
          <Text style={styles.error}>
            {errors.phone}
          </Text>
        )}

        <TextInput
          placeholder="Delivery Address"
          placeholderTextColor="#111"
          multiline
          style={[
            styles.input,
            styles.addressInput,
          ]}
          value={address}
          onChangeText={setAddress}
        />

        {errors.address && (
          <Text style={styles.error}>
            {errors.address}
          </Text>
        )}


 <TouchableOpacity
  style={styles.locationButton}
  onPress={getCurrentLocation}
>

  <Text style={styles.locationButtonText}>
    Use Current Location 📍
  </Text>

</TouchableOpacity>

{customerLocation && mapRegion && (

<View style={styles.mapContainer}>

<MapView
  style={styles.map}
  region={mapRegion}
  onRegionChangeComplete={
    setMapRegion
  }
>

<Marker
  coordinate={mapRegion}
  draggable

  onDragEnd={(e) => {

    const coords =
      e.nativeEvent.coordinate;

    setCustomerLocation(coords);

    setMapRegion({
      ...coords,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });

  }}
/>

</MapView>

<Text style={styles.mapText}>
  Adjust delivery pin if needed 📍
</Text>

</View>

)}

        <TouchableOpacity
          style={styles.button}
          onPress={handlePlaceOrder}
        >

          <Text style={styles.buttonText}>
            Confirm Order
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
    padding: 24,
  },

  title: {
    marginTop: 50,
    fontSize: 32,
    fontWeight: "800",
    color: "#111",
    marginBottom: 30,
  },

  itemCard: {
    backgroundColor: "#111",
    padding: 24,
    borderRadius: 24,
    marginBottom: 30,
  },

  itemName: {
    color: "#FFF",
    fontSize: 26,
    fontWeight: "800",
  },

  itemPrice: {
    marginTop: 10,
    color: "#22C55E",
    fontSize: 18,
    fontWeight: "700",
  },

  label: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 14,
    color: "#111",
  },

  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  quantityButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
  },

  quantityButtonText: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "700",
  },

  quantityText: {
    marginHorizontal: 24,
    fontSize: 24,
    fontWeight: "800",
  },

  totalPrice: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 30,
    color: "#22C55E",
  },

  input: {
    backgroundColor: "#FFF",
    padding: 18,
    borderRadius: 16,
    marginBottom: 18,
    fontSize: 15,
  },

  addressInput: {
    height: 120,
    textAlignVertical: "top",
  },

  button: {
    backgroundColor: "#111",
    padding: 18,
    borderRadius: 18,
    marginTop: 12,
    marginBottom: 40,
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


  locationButton: {
  backgroundColor: "#2563EB",
  padding: 16,
  borderRadius: 16,
  marginBottom: 16,
},

locationButtonText: {
  color: "#FFF",
  textAlign: "center",
  fontWeight: "700",
},

mapContainer: {
  marginBottom: 20,
},

map: {
  height: 220,
  borderRadius: 20,
},

mapText: {
  marginTop: 10,
  textAlign: "center",
  color: "#666",
  fontWeight: "600",
},

});

