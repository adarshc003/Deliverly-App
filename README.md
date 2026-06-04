# Deliverly 🚚

### Delivery Management Mini App

## APK Download

[Download APK](https://expo.dev/accounts/adarsh_003/projects/mobile/builds/ca389ba3-d8f0-46ba-aaf0-70785d0ab0f8)

Deliverly is a full-stack delivery management mobile application built using **React Native, Node.js, Express.js, and MongoDB**.

The application allows customers to place and track food orders while delivery partners can securely accept and manage deliveries through a dedicated dashboard.

This project focuses on real-world workflow implementation, role-based authentication, API integration, delivery management logic, Google Maps integration, and modern mobile UI/UX.

---

# Features

## Customer Module

* Customer Registration & Login
* Browse food items visually
* Place orders with quantity selection
* Dynamic total price calculation
* Real-time order tracking
* Live delivery partner location tracking
* Google Maps integration
* Use current location while placing orders
* Route-based live tracking screen
* Profile management
* Form validation with inline error handling
* Toast notifications for better user experience

---

## Delivery Partner Module

* Secure Delivery Partner Registration
* Access Key Verification
* View Available Orders
* Accept / Reject Orders
* Update Delivery Status
* Dedicated Delivery Dashboard
* Duplicate Order Acceptance Prevention
* Live location updates every 5 seconds after pickup
* Route navigation to customer location using Google Maps

---

# Key Implementations

* Role-Based Authentication System
* JWT Authentication
* Protected Backend Routes
* Delivery Assignment Restrictions
* Dynamic Pricing Logic
* Real-Time Order Workflow
* Order Ownership Validation
* Google Maps SDK Integration
* Live GPS Coordinate Updates
* Periodic Delivery Tracking
* MongoDB Database Integration
* REST API Architecture
* Modern Mobile UI Design

---

# Security Features

* Protected API Routes
* JWT Token Authentication
* Role-Based Access Control
* Environment Variable Configuration
* Delivery Access Key Verification
* Secure Order Ownership Validation

---

# Tech Stack

## Frontend

* React Native
* Expo
* React Navigation
* React Native Maps
* Expo Location
* AsyncStorage
* Axios

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

---

# Application Workflow

## Customer Flow

1. Register / Login
2. Browse food items
3. Select quantity
4. Use current location or enter delivery address
5. Place order
6. Track order status
7. View live delivery partner location

---

## Delivery Partner Flow

1. Register / Login
2. View pending orders
3. Accept delivery request
4. Navigate to customer location
5. Mark order as picked up
6. Share live location updates automatically
7. Complete delivery

---

# Project Structure

```bash
Deliverly/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── mobile/
│   ├── navigation/
│   ├── screens/
│   ├── services/
│   ├── assets/
│   └── App.js
│
└── README.md
```

---

# Installation & Setup

## Clone Repository

```bash
git clone https://github.com/adarshc003/Deliverly-App.git
```

---

## Backend Setup

```bash
cd backend
npm install
npm start
```

---

## Frontend Setup

```bash
cd mobile
npm install
npx expo start
```

---

# Environment Variables

## Backend `.env`

Create a `.env` file inside the backend folder.

```env
MONGO_URI=YOUR_MONGODB_CONNECTION
JWT_SECRET=YOUR_SECRET_KEY
DELIVERY_ACCESS_KEY=YOUR_ACCESS_KEY
```

---

## Frontend `.env`

Create a `.env` file inside the mobile folder.

```env
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
```

---

# Demo Delivery Access Key

```text
DELIVERLY_2026
```

---

# Platform Compatibility

* Android Supported
* iOS Compatible (Google Maps API configuration required for iOS builds)

---

# Future Improvements

* Online Payment Integration
* Push Notifications
* Background GPS Tracking
* Admin Dashboard
* Order Analytics
* Google Authentication

---

# Author

### Adarsh C
