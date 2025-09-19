import Product from "../models/product.model.js";
import multer from "multer";
import path from "path";


// storage config (save in /uploads folder)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(
            null,
            Date.now() + "-" + file.fieldname + path.extname(file.originalname)
        );
    },
});

// file filter (only images allowed)
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error("Only images are allowed!"));
    }
};

export const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter,
});

export const addProduct = async (req, res) => {
    try {
        const {
            name,
            category,
            brand,
            model,
            year,
            price,
            discount,
            key_points,
            description,
            mileage,
            fuel_type,
            transmission,
            owner_count,
            location,
        } = req.body;

        const images = req.files ? req.files.map((file) => file.path) : [];

        if (
            !name ||
            !category ||
            !brand ||
            !price ||
            images.length === 0 ||
            !fuel_type ||
            !location
        ) {
            return res.status(400).json({ success: false, message: "Fill all required fields" });
        }

        const seller = req.id;
        if (!seller) {
            return res
                .status(401)
                .json({ success: false, message: "Unauthorized: Seller not found" });
        }
        const newProduct = new Product({
            name,
            category,
            brand,
            model,
            year,
            price,
            discount,
            images,
            key_points,
            description,
            mileage,
            fuel_type,
            transmission,
            owner_count,
            location,
            seller,
        });
        await newProduct.save();
        res.status(200).json({
            data: newProduct,
            success: true,
            message: "Product Created Successfully!",
        });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// get all product 
export const getAllProduct = async (req, res) => {
    try {
        const products = await Product.find();

        if (!products) {
            return res.status(400).json({ message: "product not found" });
        }

        res.status(200).json({ data: products, message: "Get All Products" })
    } catch (error) {
        console.log("error", error)
        res.status(200).json({ message: "Internal Server Error" });
    }
}

// find product By Id 
export const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
         if (!product) {
            res.status(400).json({ message: "Product Not Found! " })
        }
        res.status(200).json({ data: product, message: "All Product" });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// DELETE PRODUCT 
export const deleteProductById = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({ message: "Product ID is required" });
        }
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ message: "No product found with this ID" });
        }

        return res.status(200).json({ message: "Product deleted successfully!" });
    } catch (error) {
        console.error("Error deleting product:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};



