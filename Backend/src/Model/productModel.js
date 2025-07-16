const mongoose=require("mongoose")

const productSchema=new mongoose.Schema({

   productName:{
    type:String,
    required:true,
    trim:true
   },
    productImage:{
    type: String,
    required: true,
    trim:true
   },
   description:{
    type:String,
    required:true,
    trim:true
   },
   price:{
    type:Number,
    required:true,

   },
   category:{
    type:String,
    required:true,
    enum:["electronics","clothing","food","books","furniture"],
    trim:true
   },
   rating:{
    type:Number,
    required:true,
    
   },
   isFreeDelivery:{
    type:Boolean,
    default:true
   }

},
{timestamps:true}
);
module.exports= mongoose.model("product" ,productSchema)