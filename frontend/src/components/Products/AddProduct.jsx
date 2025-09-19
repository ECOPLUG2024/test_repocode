import React, { useState } from "react";
import axios from "axios";
import { api } from "../../config/config";

const AddProduct = () => {
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        brand: "",
        model: "",
        year: "",
        price: "",
        discount: "",
        key_points: "",
        description: "",
        mileage: "",
        fuel_type: "",
        transmission: "",
        owner_count: "",
        location: "",
        seller: "",
    });

    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e) => {
        setImages(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = new FormData();

            for (let key in formData) {
                if (key === "key_points") {
                    formData[key]
                        .split(",")
                        .map((point) => point.trim())
                        .forEach((point) => data.append("key_points", point));
                } else {
                    data.append(key, formData[key]);
                }
            }
            for (let i = 0; i < images.length; i++) {
                data.append("images", images[i]);
            }

            const res = await api.post(
                `product/add-product`,
                data,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            setMessage(res.data.message);
        } catch (error) {
            console.error("Error uploading product:", error);
            setMessage("Failed to add product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen   flex justify-center items-center py-10">
            <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-5xl">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                    Add New Product
                </h1>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left side - Product Details */}
                    <div className="space-y-5">
                        {[
                            { label: "Product Name", name: "name", type: "text" },
                            { label: "Category", name: "category", type: "text" },
                            { label: "Brand", name: "brand", type: "text" },
                            { label: "Model", name: "model", type: "text" },
                            { label: "Year", name: "year", type: "number" },
                            { label: "Price", name: "price", type: "number" },
                            { label: "Discount", name: "discount", type: "number" },
                            { label: "Mileage", name: "mileage", type: "text" },
                            { label: "Fuel Type", name: "fuel_type", type: "text" },
                            { label: "Transmission", name: "transmission", type: "text" },
                            { label: "Owner Count", name: "owner_count", type: "number" },
                            { label: "Location", name: "location", type: "text" },
                        ].map((field, idx) => (
                            <div key={idx}>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    {field.label}
                                </label>
                                <input
                                    type={field.type}
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    required={["name", "category", "brand", "model", "year", "price"].includes(field.name)}
                                />
                            </div>
                        ))}

                        {/* Key Points */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Key Points (comma separated)
                            </label>
                            <textarea
                                name="key_points"
                                value={formData.key_points}
                                onChange={handleChange}
                                rows="3"
                                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Right side - Image Upload */}
                    <div className="flex flex-col justify-between space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Upload Product Images
                            </label>
                            <div className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50 hover:bg-gray-100 cursor-pointer">
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                    id="imageUpload"
                                    required
                                />
                                <label
                                    htmlFor="imageUpload"
                                    className="flex flex-col items-center cursor-pointer"
                                >
                                    <span className="text-gray-500">Click to upload or drag files</span>
                                    <span className="text-sm text-gray-400 mt-1">PNG, JPG, JPEG</span>
                                </label>
                            </div>

                            {/* Preview Images */}
                            {images.length > 0 && (
                                <div className="mt-4 grid grid-cols-3 gap-3">
                                    {Array.from(images).map((file, idx) => (
                                        <div
                                            key={idx}
                                            className="w-full h-24 rounded-lg overflow-hidden border"
                                        >
                                            <img
                                                src={URL.createObjectURL(file)}
                                                alt="preview"
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-3 rounded-xl shadow-md hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {loading ? "Uploading..." : "Add Product"}
                        </button>
                    </div>
                </form>

                {message && (
                    <p className="mt-6 text-center text-green-600 font-medium">{message}</p>
                )}
            </div>
        </div>
    );
};

export default AddProduct;
