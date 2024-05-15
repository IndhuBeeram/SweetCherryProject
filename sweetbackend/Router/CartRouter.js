const express=require("express")

const cartRouter=express.Router();
const cartController=require("../Controller/CartController");

cartRouter.put("/add/:userId",cartController.createCart);
cartRouter.get("/:userId",cartController.getcartItems)

module.exports=cartRouter