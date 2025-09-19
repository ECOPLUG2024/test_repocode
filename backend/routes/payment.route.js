import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { createPaymentLink } from "../controller/payment.controller.js";


const router = express.Router();


router.post("/payment/:id", isAuthenticated, createPaymentLink);

export default router;