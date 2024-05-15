const UserController=require("../Controller/UserController")
const express=require("express")
const UserRouter=express.Router();
const Middleware=require("../Middleware")

UserRouter.get("/register",UserController.getAllUser);
UserRouter.post("/register",UserController.createUser);
UserRouter.post("/login",UserController.loginUser);
UserRouter.get("/myprofile",Middleware,UserController.getObject);
UserRouter.get("/:id",UserController.getUserByID)
UserRouter.put("/edit/:id",UserController.updateUserById)
// UserRouter.get("/myprofile",Middleware,)

module.exports=UserRouter;