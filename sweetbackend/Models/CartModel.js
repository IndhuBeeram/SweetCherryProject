const mongoose = require('mongoose');
const Registeruser=require('../Models/UserModel');
const Product=require('../Models/ProductModel');
const CartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Registeruser,
    required: true
  },
  product: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: Product,
    required: true
  }]
});
 
module.exports = mongoose.model('Cart', CartSchema);