const Order = require("../models/Order");


// CUSTOMER - PLACE ORDER
const placeOrder = async (
  req,
  res
) => {

  try {

    console.log(req.body);

    const {
      customerName,
      phone,
      item,
      itemPrice,
      quantity,
      totalPrice,
      address,
      customerLocation,
    } = req.body;

    const order =
      await Order.create({

        customerName,
        phone,
        item,
        itemPrice,
        quantity,
        totalPrice,

        address:
          address || "Location Selected",

        customerLocation,

        customer:
          req.user.id,

        status: "Pending",

      });

    res.status(201).json(order);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};


// GET ORDERS
const getOrders = async (req, res) => {

  try {

    let orders;

    // DELIVERY PARTNER
    if (req.user.role === "delivery") {

      orders = await Order.find({

        $or: [

          // available orders
          {
            status: "Pending",
          },

          // own accepted orders
          {
            deliveryBoy: req.user.id,
          },

        ],

      }).sort({
        createdAt: -1,
      });

    }

    // CUSTOMER
    else {

      orders = await Order.find({

        customer: req.user.id,

      }).sort({
        createdAt: -1,
      });

    }

    res.status(200).json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// DELIVERY BOY - ACCEPT ORDER
const acceptOrder = async (
  req,
  res
) => {

  try {

    const order =
      await Order.findById(
        req.params.id
      );

    if (!order) {

      return res.status(404).json({
        message: "Order not found",
      });

    }

    // prevent double acceptance
    if (order.status !== "Pending") {

      return res.status(400).json({
        message:
          "Order already accepted",
      });

    }

    order.status = "Accepted";

    order.deliveryBoy =
      req.user.id;

    await order.save();

    res.status(200).json(order);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// DELIVERY BOY - REJECT ORDER
const rejectOrder = async (
  req,
  res
) => {

  try {

    const order =
      await Order.findById(
        req.params.id
      );

    if (!order) {

      return res.status(404).json({
        message: "Order not found",
      });

    }

    order.status = "Pending";

    order.deliveryBoy = null;

    await order.save();

    res.status(200).json({
      message: "Order rejected",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// DELIVERY BOY - UPDATE STATUS
const updateOrderStatus = async (
  req,
  res
) => {

  try {

    const { status } = req.body;

    const order =
      await Order.findById(
        req.params.id
      );

    if (!order) {

      return res.status(404).json({
        message: "Order not found",
      });

    }


    // ensure assigned rider only
    if (
      !order.deliveryBoy ||
      order.deliveryBoy.toString() !==
        req.user.id
    ) {

      return res.status(403).json({
        message:
          "Unauthorized action",
      });

    }

    order.status = status;

    await order.save();

    res.status(200).json(order);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const updateDeliveryLocation = async (
  req,
  res
) => {

  try {

    const {
      latitude,
      longitude,
    } = req.body;

    const order =
      await Order.findById(
        req.params.id
      );

    if (!order) {

      return res.status(404).json({
        message: "Order not found",
      });

    }

    if (
  !order.deliveryBoy ||
  order.deliveryBoy.toString() !==
    req.user.id
) {

  return res.status(403).json({
    message:
      "Unauthorized action",
  });

}

    order.deliveryLocation = {
      latitude,
      longitude,
    };

    await order.save();

    res.status(200).json({
      message:
        "Location updated",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};



module.exports = {

  placeOrder,
  getOrders,
  acceptOrder,
  rejectOrder,
  updateOrderStatus,
  updateDeliveryLocation,

};