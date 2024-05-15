const express=require("express")
const app=express();
const cors=require('cors')
const mongoose=require('mongoose');

const productRouter=require("./Router/ProductRouter");
const UserRouter=require("./Router/UserRouter");
const wishlistRouter=require("./Router/WishlistRouter");
const cartRouter=require("./Router/CartRouter");
const AddressRouter=require("./Router/AddressRouter");

//middleware
app.use(cors({origin:"*"}))
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'));

const dburl = 'mongodb://127.0.0.1:27017/Cupcakedb';

mongoose.connect(dburl)
.then(()=>console.log("Connection with mongodb successfull"))
.catch(()=>console.log("connection with mongodb failed"))


app.use("/api/products",productRouter)
app.use("/api/wishlist",wishlistRouter)
app.use("/api/cart",cartRouter)
app.use("/api/address",AddressRouter);
app.use("/api",UserRouter)

app.listen(4000,()=>console.log("Server running...."))

