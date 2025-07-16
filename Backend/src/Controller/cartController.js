const mongoose = require("mongoose");
const cartModel=require("../Model/cartModel.js")
const {isValid}=require("./validator");
const productModel = require("../Model/productModel");
// const productModel=require("../Model/productModel.js")

const addToCart=async(req,res)=>{
    try {
       let userId=req.user.userId;

        //userId Validation
       if(!isValid(userId)|| !mongoose.Types.ObjectId.isValid(userId)){
        return res.status(400).json({message:"valid User Id is required"})
       }

       let {productId,quantity}=req.body;

       //productId Validation
       if(!isValid(productId)|| !mongoose.Types.ObjectId.isValid(productId)){
        return res.status(400).json({message:"valid Product Id is required"})
       }

       //quantity Validation
       if(
        !isValid(quantity)||
        typeof quantity!=="number" || 
        !Number.isInteger(quantity) || quantity<1){
        return res.status(400).json({message:"valid quantity is required" })
       }

       let product=await productModel.findById(productId);
       if(!product){
        return res.status(404).json({message:"product not found"})
       }

       let cart=await cartModel.findOne({userId});
       if(!cart){
        cart=await cartModel.create({
            userId,
            items:[{productId,quantity}],
            totalItems:1,
            totalPrice:product.price*quantity
        })
       }
       else{
        let found = false;

      cart.items = cart.items.map((item) => {
        if (item.productId.toString() === productId) {
          found = true;
          item.quantity += quantity;
        }
        return item;
      });

      if (!found) {
        cart.items.push({ productId, quantity });
      }

      cart.totalItems = cart.items.length;

      const populated = await cart.populate("items.productId", "price");
      cart.totalPrice = populated.items.reduce(
        (sum, item) => sum + item.productId.price * item.quantity,
        0
      );
    }

    await cart.save();
    return res.status(200).json({ msg: "Item Added To Cart", cart });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
};

// Get Cart
const getCart = async (req, res) => {
  //  console.log("🔥 getCart route HIT");
  try {
    let userId = req.user.userId;

    const cart = await cartModel
      .findOne({ userId })
      .populate("items.productId", "productImage productName price");

    if (!cart) {
      
      return res.status(404).json({ msg: "Cart Not Found" });
    }

    return res.status(200).json({ msg: "Cart Fetched Successfully", cart });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
};

// Update Cart

const updateCart=async(req,res)=>{
  try {
    let userId = req.user.userId;
    let {productId,quantity}=req.body;

    //product id validation
     if(!isValid(productId)|| !mongoose.Types.ObjectId.isValid(productId)){
        return res.status(400).json({message:"valid Product Id is required"})
       }

       //quantity Validation
       if (
      !isValid(quantity) ||
      typeof quantity !== "number" ||
      quantity < 1 ||
      !Number.isInteger(quantity)
    )
       {
        return res.status(400).json({message:"valid quantity is required" })
       }
       let cart=await cartModel.findOne({userId})
       if(!cart){
        return res.status(404).json({message:"cart not found" })
       }

       let index=cart.items.findIndex(
        (item)=>item.productId.toString()===productId
       );

       if(index===-1){
        return res.status(404).json({msg:"product not found in cart"})
       }

       if(quantity===0){
        cart.items.splice(index,1);
       }
       else{
        cart.items[index].quantity=quantity;
       }
       cart.totalItems=cart.items.length;

       let populated=await cart.populate("items.productId","price");

       cart.totalPrice=populated.items.reduce((sum,item)=>{
        if(item.productId){
          return sum + item.productId.price*item.quantity;
        }
        else{
          return sum;
        }
       },0);
       await cart.save();
       return res.status(200).json({msg:"cart updated",cart})

    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error", error });
    
  }
}

// remove items from cart

const removeItemFromCart=async(req,res)=>{
  try {
    let userId=req.user.userId;

    let{productId}=req.params;

    //prdct Id Validation 
    if(!isValid(productId) || !mongoose.Types.ObjectId.isValid(productId)){
      return res.status(400).json({msg:"valid productId is required"})
    }
    let cart=await cartModel.findOne({userId});
    if(!cart){
      return res.status(404).json({msg:"cart not found"})
    }

    let productExists=cart.items.some(
      (item)=>item.productId.toString()===productId
    );
    if(!productExists){
      return res.status(404).json({msg:"product not found in cart"})
    }
    cart.items=cart.items.filter(
      (item)=>item.productId.toString()!==productId
    );
    cart.totalItems=cart.items.length;

    let populated=await cart.populate("items.productId","price");

    cart.totalPrice=populated.items.reduce(
      (sum,item)=>sum+item.productId.price*item.quantity,0
    );
    await cart.save();
    return res.status(200).json({msg:"item removed from cart successfully",cart})
    
  } catch (error) {
    
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
}


// Clear Cart
const clearCart = async (req, res) => {
  try {
    let userId = req.user.userId;

    const cart = await cartModel.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ msg: "Cart Not Found" });
    }

    cart.items = [];
    cart.totalItems = 0;
    cart.totalPrice = 0;

    await cart.save();
    return res.status(200).json({ msg: "Cart Cleared Successfully", cart });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
};

module.exports={addToCart,getCart,clearCart,updateCart,removeItemFromCart};
