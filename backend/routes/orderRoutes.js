const express = require("express");

const {
  placeOrder,
  getOrders,
  acceptOrder,
  rejectOrder,
  updateOrderStatus,
  updateDeliveryLocation,
} = require("../controllers/orderController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();


// CUSTOMER
router.post("/", protect, placeOrder);

router.get("/", protect, getOrders);


// DELIVERY BOY
router.put("/accept/:id", protect, acceptOrder);

router.put("/reject/:id",protect,rejectOrder);

router.put("/status/:id", protect, updateOrderStatus);

router.put("/location/:id", protect, updateDeliveryLocation);

module.exports = router;