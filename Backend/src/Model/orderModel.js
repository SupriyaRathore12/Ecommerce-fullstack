const mongoose=require("mongoose")

const orderSchema=new mongoose.Schema({
  
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
        // unique:true,
    },
     items:[
            {
                productId:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"product",
                    required:true,
                },
                quantity:{
                    type:Number,
                    required:true,
                    min:1,
                }
            }
        ],
        totalItems:{
            type:Number,
            required:true,
           
        },
        totalPrice:{
            type:Number,
            required:true,
            
        },

    cartId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"cart",
        required:true,
        // unique:true,

    },

    orderStatus:{
        type:String,
        required:true,
        enum:["pending","shipped","delivered","cancelled"],
        trim:true,

    },
    paymentStatus:{
        type:String,
        required:true,
        enum:["cash" ,"onlineMode"],
        default:"cash",
        trim:true,
    },
    shippingAddress:{
        type:String,
        required:true,
        trim:true,
},
orderedAt:{
    type:Date,
    default:Date.now,
}
},


{timestamps:true},
);
module.exports= mongoose.model("order",orderSchema);