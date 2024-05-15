const express=require("express");
const productRouter=express.Router();
const productController=require('../Controller/ProductController');

productRouter.get("/",productController.getAllProducts);
productRouter.get("/search" , productController.getProduct);
// productRouter.get("/category/:category",productController.getProductByCategory)
// productRouter.get("/search/:name",productController.getProduct)
productRouter.get("/:id",productController.getProductById)


productRouter.post("/add",productController.createProducts);


module.exports=productRouter;