



import express from "express";
import { addProduct, deleteProductById, getAllProduct, getProductById, upload } from "../controller/product.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();


router.post("/add-product", upload.array("images", 5), isAuthenticated, addProduct);
router.get("/get-products", isAuthenticated, getAllProduct);
router.get("/product-details/:id", isAuthenticated, getProductById);
router.delete("/delete-product/:id", isAuthenticated, deleteProductById)

export default router;