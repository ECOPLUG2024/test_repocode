



import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { addToCart, getAllCartItem, removeItemFromCart } from "../controller/cart.controller.js";


const router = express.Router();


router.post("/add-to-cart", isAuthenticated, addToCart);
router.get("/get-cart-item", isAuthenticated, getAllCartItem);
router.delete("/remove-item-cart/:id", isAuthenticated, removeItemFromCart);

export default router;