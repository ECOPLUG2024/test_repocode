import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        category: {
            type: String, 
            required: true,
        },

        brand: {
            type: String,
            required: true,
        },

        model: {
            type: String,
            required: true,
        },

        year: {
            type: Number,
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },

        discount: {
            type: Number,
            default: 0,
        },
        images: [
            {
                type: String,
                required: true,
            },
        ],
        key_points: [
            {
                type: String,
            },
        ],

        description: {
            type: String,
        },

        mileage: {
            type: String,
        },

        fuel_type: {
            type: String,
            enum: ["Petrol", "Diesel", "Electric", "Hybrid"],
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
