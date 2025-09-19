import User from "../models/user.model.js";
import jwt from "jsonwebtoken";



export const isAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
 
        if (!authHeader) {
            return res.status(401).json({ message: "User Unauthorized" });
        }

        const token = authHeader.split(" ")[1];
 
        const decode = jwt.verify(token, process.env.JWT_SECRET || "hdfjkhaskfskdjnksjfh");
 
        // 🔑 FIX: use decode.id instead of decode.userId
        if (!decode || !decode.id) {
            return res.status(401).json({ message: "Invalid User" });
        }

        req.id = decode.id;

        const isUser = await User.findById(req.id);
        if (!isUser) {
            return res.status(401).json({ message: "Invalid User" });
        }
 
        next();

    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

