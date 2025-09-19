
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        reuired: true,
    },
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    status: {
        type: String,
        default: "order_placed",
        enum: ["order_placed", "confirm_order", "out_for_delevery", "delevered_order", "confirm_order"],
    }
}, { timestamps: true })


const Order = mongoose.model("orders", orderSchema);
export default Order;