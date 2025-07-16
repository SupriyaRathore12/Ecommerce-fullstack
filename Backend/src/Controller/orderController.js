const orderModel = require("../Model/orderModel");
const cartModel = require("../Model/cartModel")
const mongoose = require("mongoose");
const { isValid } = require("./validator")


//place order

const placeOrder = async (req, res) => {
    try {
        let userId = req.user.userId;

        const cart = await cartModel.findOne({ userId }).populate("items.productId", "productName price");

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Your cart is empty" });
        }
        const { totalItems, totalPrice, items,_id:cartId } = cart;

        // shipping address validation

        let { shippingAddress } = req.body;
        if (!isValid(shippingAddress)) {
            return res.status(400).json({ message: " shipping address is required" });
        }
      
        const orderData = {
            userId,
            cartId,
            items: cart.items.map((item) => ({
                productId: item.productId._id,
                quantity: item.quantity,
            })),
            totalPrice,
            totalItems,
            shippingAddress,
            orderStatus: "pending",
            paymentStatus: "cash",

        }
        let order = await orderModel.create(orderData);
        cart.items = [];
        cart.totalItems = 0;
        cart.totalPrice = 0;
        await cart.save();
        res.status(201).json({ message: "Order placed successfully", order });


    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Internal server error", error })

    }
}

// get order

const getMyOrder = async (req, res) => {
    try {
        const userId = req.user.userId;
        const orders = await orderModel.find({ userId }).populate("items.productId", "productName productImage quantity price");

        if (orders.length === 0) {
            return res.status(400).json({ message: "No orders found" });

        }
        return res.status(200).json({ msg: "Your orders:", orders })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal server error", error })

    }
}

// cancel order

const cancelOrder = async (req, res) => {
    try {
        let userId = req.user.userId;
        let orderId = req.params.id;

        // ordered id validation

        if (!isValid(orderId) || !mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({ msg: "Valid orderId is Required" });
        }

        let order = await orderModel.findOne({ _id: orderId, userId });

        if (!order) {
            return res.status(404).json({ msg: "order not found" })
        }
        if (order.orderStatus !== "pending") {
            return res.status(400).json({ msg: "only pending orders can be cancelled" })
        }

        order.orderStatus = "cancelled";

        await order.save();

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal server error", error })

    }
}




module.exports = { placeOrder, getMyOrder, cancelOrder };