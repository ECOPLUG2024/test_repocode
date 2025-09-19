import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import { createPaymentLink } from "./payment.controller.js";

// placed Order
export const placedOrder = async (req, res) => {
    try {
        const { order } = req.body;
        const userId = req.id;


        if (!order || order.length === 0) {
            return res.status(400).json({ success: false, message: "Order should not be empty" });
        }
        if (!userId) {
            return res.status(400).json({ success: false, message: "User Not Found!" });
        }
        const savedOrders = [];

        for (const userData of order) {
            const newOrder = new Order({
                user: userId,
                item: userData._id,
            });

            const orderDataFromDb = await newOrder.save();
            savedOrders.push(orderDataFromDb);



            await User.findByIdAndUpdate(userId, {
                $push: { orders: orderDataFromDb._id },
            });

            // clear cart 
            await User.findByIdAndUpdate(userId, {
                $pull: { cart: userData._id },
            });
        }
        createPaymentLink(savedOrders[0]._id);
        res.status(200).json({ success: true, message: "Order Placed Successfully!", data: savedOrders });


    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


// Get All Order Data
export const getAllOrderHistory = async (req, res) => {
    try {
        const orderData = await Order.find().populate("item").populate("user", "name email number address role _id").sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: orderData, message: "OrderData Fetched!" })
    } catch (error) {
        console.log("error", error)
    }
}

// 