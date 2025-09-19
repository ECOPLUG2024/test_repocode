import express  from "express";
import { getAllUsers, getUserProfile, login, register } from "../controller/user.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();


router.post("/register", register);
router.post("/login", login);
router.get("/allusers", isAuthenticated, getAllUsers);
router.get("/user-profile", isAuthenticated, getUserProfile);

export default router;