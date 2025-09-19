import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

// Add to cart
export const addToCart = async (req, res) => {
    try {
        const userId = req.id;
        const { productId, quantity } = req.body;


        if (!productId || !quantity) {
            return res.status(400).json({ message: "Product ID and quantity are required" });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        let cart = await Cart.findOne({ user: userId, status: "active" });

        if (!cart) {
            cart = new Cart({
                user: userId,
                items: [],
            });
        }

        // Check if product already in cart
        const itemIndex = cart.items.findIndex(
            (item) => item.product.toString() === productId
        );

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({
                product: productId,
                quantity,
                price: product.price,
                discount: product.discount,
            });
        }


        await cart.save();

        res.status(200).json({
            message: "Item added to cart successfully",
            data: cart,
        });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// get all cart Items with product & user details
export const getAllCartItem = async (req, res) => {
    try {
        // Get all carts
        const carts = await Cart.find().lean();

        if (!carts || carts.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No items found in cart",
            });
        }

 
        // Collect all items
        const allItems = carts.flatMap((cart) =>
            cart.items.map((item) => ({
                ...item,
                cartUser: cart.user,
            }))
        );

        const productIds = allItems.map((item) => item.product);
        const userIds = carts.map((cart) => cart.user);

        const products = await Product.find({ _id: { $in: productIds } }).lean();

        const users = await User.find({ _id: { $in: userIds } }).lean().select("name number email address _id");

        const cartWithDetails = allItems.map((item) => {
            const product = products.find(
                (p) => p._id.toString() === item.product.toString()
            );
            const user = users.find(
                (u) => u._id.toString() === item.cartUser.toString()
            );

            return {
                ...item,
                productDetails: product || null,
                userDetails: user || null,
            };
        });

        res.status(200).json({
            success: true,
            message: "Cart items with product & user details fetched successfully!",
            total: cartWithDetails.length,
            data: cartWithDetails,
        });
    } catch (error) {
        console.error("error", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};



// remove from cart
export const removeItemFromCart = async (req, res) => {
    try {
        const id = req.params.id;
        console.log("id", id);
        const cartItem = await Product.findByIdAndDelete(id);
        if (!cartItem) {
            res.status(400).json({ message: "Product Not Found" });
        }

        res.status(200).json({ success: true, message: "Product Remove from Cart" });

    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
