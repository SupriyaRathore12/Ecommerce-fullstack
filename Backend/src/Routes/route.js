const express = require('express')
const router = express.Router();
// const {addUsers, updateUser}=require("../Controller/userController")
// const{getUsers}=require("../Controller/userController")
// const{updateUser}=require("../Controller/userController")

// user router

const{
    addUsers,
    getUsers,
    updateUser,
    deleteUser,
    loginUser,
    getProfile
}=require("../Controller/userController")
// router.get("/",(req,res)=>{
//     res.send("Hello from server side")
// })

const authmiddleware=require("../middleware/authmiddleware");

const{
    addProducts,
    getAllProducts,
    getProductsById,
    getProductsByQuery,
    updateProducts,
    deleteProducts
}=require("../Controller/productController")

router.post("/addUser",addUsers)
router.get("/getUsers",authmiddleware,getUsers)
router.put("/updateUser/:id",authmiddleware,updateUser)
router.delete("/deleteUser/:id",authmiddleware,deleteUser)
router.post("/login",loginUser)
router.get("/profile",authmiddleware,getProfile)


// product router
router.post("/addProducts",authmiddleware,addProducts);
router.get("/getAllProducts",getAllProducts);
router.get("/getProductsById/:id",getProductsById);
router.get("/getProductsByQuery",getProductsByQuery);
router.put("/updateProducts/:id",authmiddleware,updateProducts);
router.delete("/deleteProducts/:id",authmiddleware,deleteProducts);


// cart routes

const{addToCart,getCart,clearCart, updateCart,removeItemFromCart}
=require("../Controller/cartController");



router.post("/addToCart",authmiddleware,addToCart)
router.get("/getCart",authmiddleware,getCart)
router.delete("/clearCart",authmiddleware,clearCart)
router.put("/updateCart",authmiddleware,updateCart)
router.delete("/removeItem/:productId",authmiddleware,removeItemFromCart)


//order


const {placeOrder,getMyOrder, cancelOrder}=require("../Controller/orderController")


router.post("/placeOrder",authmiddleware,placeOrder)
router.get("/getMyOrder",authmiddleware,getMyOrder)
router.delete("/cancelOrder",authmiddleware,cancelOrder)






module.exports=router;