import React, { useEffect, useState } from "react";
import { api, API_BASE_URL_DOC } from "../../config/config";
import { useNavigate } from "react-router-dom";

const Products = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const getAllProduct = async () => {
        try {
            const response = await api.get("product/get-products");
            setProducts(response.data.data);
        } catch (error) {
            console.log("error", error);
        }
    };

    useEffect(() => {
        getAllProduct();
    }, []);

    // Navigate to Add Product page
    const handleAddProduct = () => {
        navigate("/add-product");
    };
    // Navigate to Add Product page
    const handleViewProductDetails = (id) => {
        navigate(`/view-product-details/${id}`);
    };
 

    // Delete Product
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            await api.delete(`product/delete-product/${id}`);
            setProducts(products.filter((product) => product._id !== id));
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    return (
        <div className="p-6">
            {/* Header with Add Product Button */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <h1 className="text-2xl font-bold">Products</h1>
                <button
                    onClick={handleAddProduct}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Add Product
                </button>
            </div>

            {/* Responsive Table */}
            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="min-w-full border border-gray-200">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold border">S. No.</th>

                            <th className="px-4 py-3 text-left text-sm font-semibold border">Image</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold border">Name</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold border">Brand</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold border">Category</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold border">Price</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold border">Discount</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold border">Mileage</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold border">Fuel</th>
                            <th className="px-4 py-3 text-center text-sm font-semibold border">Action</th>
                        </tr>
                    </thead>

                    <tbody className="text-gray-600">
                        {products.map((product, index) => (
                            <tr
                                key={product._id}
                                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                    } hover:bg-gray-100`}
                            >
                                {/* Product S.No */}
                                <td className="px-4 py-3 border">
                                    {index + 1}
                                </td>
                                {/* Product Image */}
                                <td className="px-4 py-3 border">
                                    {product.images?.length > 0 ? (
                                        <img
                                            src={`${API_BASE_URL_DOC}${product.images[0].replace(/\\/g, "/")}`}
                                            alt={product.name}
                                            className="h-12 w-12 object-contain rounded-md border"
                                        />
                                    ) : (
                                        <span className="text-gray-400 text-sm">No Image</span>
                                    )}
                                </td>

                                {/* Product Info */}
                                <td className="px-4 py-3 border font-medium">{product.name}</td>
                                <td className="px-4 py-3 border">{product.brand}</td>
                                <td className="px-4 py-3 border capitalize">{product.category} <br /> {product.fuel_type}   </td>
                                <td className="px-4 py-3 border">
                                    ₹{product.price?.toLocaleString("en-IN")}
                                </td>
                                <td className="px-4 py-3 border text-red-500">
                                    {product.discount > 0
                                        ? `₹${product.discount?.toLocaleString("en-IN")}`
                                        : "-"}
                                </td>
                                <td className="px-4 py-3 border">{product.mileage}</td>
                                <td className="px-4 py-3 border">{product.fuel_type}</td>

                                {/* Actions */}
                                <td className="px-4 py-3 border text-center">
                                    <div className="flex justify-center gap-2">
                                        <button
                                            onClick={() => handleViewProductDetails(product._id)}
                                            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition text-sm"
                                        >
                                            View
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition text-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {products.length === 0 && (
                            <tr>
                                <td colSpan="9" className="px-4 py-6 text-center text-gray-500">
                                    No products available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Products;
