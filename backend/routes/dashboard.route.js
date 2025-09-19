



import express from "express"; 
import { getDataCountForDashboard } from "../controller/dashboard.constroller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();


router.get("/dashboard-data", isAuthenticated, getDataCountForDashboard); 

export default router;