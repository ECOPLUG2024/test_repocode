import generateToken from "../config/generateToken.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";



export const register = async (req, res) => {
    try {
        const { name, number, email, address, password, role } = req.body;
        if (!name || !number || !password || !email) {
            return res.status(400).json({ success: false, message: "Kindly fill all required fields" });
        }

        const userExist = await User.findOne({
            $or: [{ number }, { email }]
        });
        if (userExist) {
            return res.status(400).json({ success: false, message: "User already Register with this number" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            number,
            address,
            password: hashPassword,
            role,
        });
        await newUser.save();

        res.status(200).json({ success: true, message: "Register Successfully!" })

    } catch (error) {
        console.log("Internal Server error", error)
        return res.status(500).json({ message: "Internal Server Error" })
    }

}

// login api 
export const login = async (req, res) => {
    try {
        const { number, password } = req.body;
        if (!number || !password) {
            return res.status(400).json({ message: "Number and Password is Required" });
        }
        const user = await User.findOne({ $or: [{ number: number }] });
        if (!user) {
            return res.status(400).json({ message: "User Not Found with This Mobile Number" })
        }

        if (user.status === "inactive") {
            return res.status(400).json({ message: "User is Inactive" });
        }

        const isValidPass = await bcrypt.compare(password, user.password);
        if (!isValidPass) {
            return res.status(400).json({ success: false, message: "Password is Not Matched" });
        }

        const token = generateToken(user._id);
        if (!token) {
            return res.status(200).json({ message: "token not generated" })
        }

        res.status(200).json({
            success: true, message: "Login Successfully", user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                number: user.number,
            },
            token,
        })



    } catch (error) {
        console.log("Internal Server Error ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (!users) {
            return res.status(400).json({ message: "user not found!" });
        }

        res.status(200).json({ data: users, message: "All Users" })


    } catch (error) {
        console.log("error", error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
}

// find user profile 
export const getUserProfile = async (req, res) => {
    try {
        const userId = req.id;

        const user = await User.findById(userId).select("-password -__v"); 
        if (!user) {
            res.status(400).json({ success: false, message: "User Not Found!" });
        }
 
        res.status(200).json({ success: true, data: user, message: "User Data Fetched!" });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
