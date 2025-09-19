import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";


export const getDataCountForDashboard = async (req, res) => {
    try {
        const TotalUsers = await User.countDocuments();
        const TotalOrder = await Order.countDocuments();
        const TotalProduct = await Product.countDocuments();
        const TotalCartItems = await Cart.countDocuments();
 
         return res.status(200).json({
            success: true,
            counts: {
                TotalUsers,
                TotalOrder,
                TotalProduct,
                TotalCartItems,
            }
        });

    } catch (error) {
        console.error("error", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};



