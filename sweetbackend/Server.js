const express = require("express");
const app = express();
const cors = require('cors');
const Razorpay = require("razorpay");
require("dotenv").config();
const mongoose = require('mongoose');
const crypto = require("crypto");

const productRouter = require("./Router/ProductRouter");
const UserRouter = require("./Router/UserRouter");
const wishlistRouter = require("./Router/WishlistRouter");
const cartRouter = require("./Router/CartRouter");
const AddressRouter = require("./Router/AddressRouter");
const Order = require('./Models/OrderModel');
const Cart = require("./Models/CartModel");

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const dburl = 'mongodb://127.0.0.1:27017/Cupcakedb';

mongoose.connect(dburl)
  .then(() => console.log("Connection with mongodb successful"))
  .catch((err) => console.log("Connection with mongodb failed:", err));

// Razorpay order creation endpoint
app.post("/order", async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    const options = req.body;
    console.log("Creating Razorpay order with options:", options);
    const order = await razorpay.orders.create(options);
    if (!order) {
      return res.status(500).send("Error creating order");
    }
    res.json(order);
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).send("Error creating order");
  }
});

// Order validation endpoint
app.post("/order/validate", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      name,
      email,
      cupcakes,
      totalAmount,
      address,
    } = req.body;

    console.log("Validating order:", req.body);

    const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");

    if (digest !== razorpay_signature) {
      return res.status(400).json({ msg: "Transaction is not legit!" });
    }

    // Save order details in the database
    const order = new Order({
      userId,
      name,
      email,
      cupcakes,
      totalAmount,
      address,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
    });
    await order.save();

    // Clear the user's cart
    await Cart.findOneAndUpdate(
      { userId },
      { $set: { product: [] } }
    );

    res.json({
      msg: "Order successful!",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
  } catch (error) {
    console.error("Error validating order:", error);
    res.status(500).json({ msg: "Error saving order", error: error.message });
  }
});

app.use("/api/products", productRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", AddressRouter);
app.use("/api", UserRouter);

app.listen(4000, () => console.log("Server running on port 4000"));
