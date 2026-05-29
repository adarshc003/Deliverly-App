# Deliverly 🚚

### Delivery Management Mini App

Deliverly is a full-stack delivery management mobile application built using **React Native, Node.js, Express.js, and MongoDB**.

The application allows customers to place and track food orders while delivery partners can securely accept and manage deliveries through a dedicated dashboard.

This project focuses on real-world workflow implementation, role-based authentication, API integration, delivery management logic, and clean mobile UI design.

---

# Features

## Customer Module

* Customer Registration & Login
* Browse food items visually
* Place orders with quantity selection
* Dynamic total price calculation
* Real-time order tracking
* Profile management
* Form validation with inline error handling
* Toast notifications for better UX

---

## Delivery Partner Module

* Secure Delivery Partner Registration
* Access Key Verification
* View Available Orders
* Accept / Reject Orders
* Update Delivery Status
* Dedicated Delivery Dashboard
* Duplicate Order Acceptance Prevention

---

# Key Implementations

* Role-Based Authentication System
* JWT Authentication
* Protected Backend Routes
* Delivery Assignment Restrictions
* Dynamic Pricing Logic
* Real-Time Order Workflow
* Order Ownership Validation
* MongoDB Database Integration
* REST API Architecture
* Modern Mobile UI/UX

---

# Tech Stack

## Frontend

* React Native
* Expo
* React Navigation
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
4. Enter delivery details
5. Place order
6. Track order status

---

## Delivery Partner Flow

1. Register / Login
2. View pending orders
3. Accept delivery request
4. Update delivery status
5. Complete delivery

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
│   └── App.js
│
└── README.md
```

---

# Installation & Setup

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/deliverly-app.git
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

Create a `.env` file inside the backend folder.

```env
MONGO_URI=YOUR_MONGODB_CONNECTION
JWT_SECRET=YOUR_SECRET_KEY
DELIVERY_ACCESS_KEY=YOUR_ACCESS_KEY
```

---

# Demo Delivery Access Key

```text
DELIVERLY_2026
```

---

# Future Improvements

* Online Payment Integration
* Push Notifications
* Live GPS Tracking
* Admin Dashboard
* Order Analytics
* Google Auth

---

# Author

### Adarsh C
