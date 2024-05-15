const mongoose=require("mongoose");
const RegisterSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    age:{type:Number},
    gender:{type:String},
   
 
},{timestamps:true})

const usermodel=mongoose.model("Register",RegisterSchema);
module.exports=usermodel;