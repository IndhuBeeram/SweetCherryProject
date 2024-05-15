const mongoose=require("mongoose");
const ProductSchema=mongoose.Schema({
    name:{type:String,require:true},
    description: { type: String ,require: true},
    price: { type: Number ,require: true },
    category:{type:String,require:true},
  
    imageUrl:{type:String,require:true}
})
module.exports=mongoose.model("product",ProductSchema);

