const mongoose=require("mongoose")
const userModel=require("../Models/UserModel");

const AddressSchema=mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:userModel,
        required:true
    },
    Address:[{
    name:{type:String,require:true},
    mobilenum:{type:String,require:true},
    pincode:{type:Number,require:true},
    locality:{type:String,require:true},
    address:{type:String,require:true},
    city:{type:String,require:true},
    state:{type:String,require:true},
    alternatephonenumber:{type:String,require:true},
    addresstype:{type:String,require:true}
    }]
    

    
},{timestamps:true})
module.exports=mongoose.model("address",AddressSchema);