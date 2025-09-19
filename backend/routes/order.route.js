



import express from "express"; 
import { getAllOrderHistory, placedOrder } from "../controller/order.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();


 router.post("/create-order", isAuthenticated, placedOrder);
 router.get("/get-order", isAuthenticated, getAllOrderHistory)
 
 
export default router;