
const mongoose = require('mongoose');
const Registeruser=require('../Models/UserModel');
const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: Registeruser, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  cupcakes: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  totalAmount: { type: Number, required: true },
  address: {
    name: String,
    addresstype: String,
    mobilenum: String,
    address: String,
    locality: String,
    city: String,
    state: String,
    alternatephonenumber: String,
    pincode: String,
  },
  razorpayOrderId: { type: String, required: true },
  razorpayPaymentId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
