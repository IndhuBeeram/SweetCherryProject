
const express=require("express")
const AddressController=require("../Controller/AddressController")
const AddressRouter=express.Router();
AddressRouter.post("/:userId",AddressController.createAddress);
AddressRouter.get("/:userId",AddressController.getAddressesByUserId);
AddressRouter.put("/:userId/:addressId",AddressController.updateAddress);
AddressRouter.delete("/:userId/:addressId",AddressController.deleteAddress);

module.exports=AddressRouter;