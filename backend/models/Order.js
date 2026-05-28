const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    phone: {
      type: String,
      required: true,
    },

    item: {
      type: String,
      required: true,
    },

    itemPrice: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      default: 1,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Accepted",
        "Picked Up",
        "Delivered",
      ],
      default: "Pending",
    },

    deliveryBoy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Order",
  orderSchema
);

