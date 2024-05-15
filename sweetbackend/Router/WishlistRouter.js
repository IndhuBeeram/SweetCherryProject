const express=require("express")

const wishlistRouter=express.Router();
const wishlistController=require("../Controller/WishlistController");

wishlistRouter.put("/add/:userId",wishlistController.createWishlist);
wishlistRouter.get("/:userId",wishlistController.getwishlistItems)

module.exports=wishlistRouter