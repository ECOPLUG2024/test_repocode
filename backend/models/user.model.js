import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        number: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
        },
        address: {
            type: String,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
        orders: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Orders"
        }],
        cart: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cart",
        }],
        status: {
            type: String,
        }

    }, { timestamps: true }
)

const User = mongoose.model("User", userSchema);
export default User;