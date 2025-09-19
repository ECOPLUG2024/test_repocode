import React, { useEffect, useState } from "react";
import { api, API_BASE_URL_DOC } from "../../config/config";

const CartItem = () => {
    const [loading, setLoading] = useState(false);
    const [cart, setCart] = useState({ total: 0, data: [] });

    const getAllCartItem = async () => {
        try {
            setLoading(true);
            const response = await api.get("cart/get-cart-item");

            if (response.data.success) {
                setCart({
                    total: response.data.total,
                    data: response.data.data,
                });
            }
        } catch (error) {
            console.error("Error fetching cart items:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllCartItem();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">🛒 Cart Details</h1>

            {loading ? (
                <p className="text-gray-500">Loading...</p>
            ) : (
                <>
                    {/* Total items */}
                    <div className="mb-4">
                        <span className="text-lg font-medium">
                            Total Cart Items: {cart.total}
                        </span>
                    </div>

                    {/* Table */}
                    {cart.data.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-gray-200 bg-white shadow-md rounded-lg">
                                <thead className="bg-gray-100 text-gray-700">
                                    <tr>
                                        <th className="px-4 py-2 border">S.No.</th>
                                        <th className="px-4 py-2 border">Image</th>
                                        <th className="px-4 py-2 border">Name</th>
                                        <th className="px-4 py-2 border">Category</th>
                                        <th className="px-4 py-2 border">Quantity</th>
                                        <th className="px-4 py-2 border">Price</th>
                                        <th className="px-4 py-2 border">Created At</th>
                                        <th className="px-4 py-2 border">User</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.data.map((item, index) => (
                                        <tr
                                            key={item._id}
                                            className="text-center hover:bg-gray-50 transition"
                                        >
                                            {/* S.No */}
                                            <td className="px-4 py-2 border">{index + 1}</td>

                                            {/* Product Image */}
                                            <td className="px-4 py-2 border">
                                                {item.productDetails?.images?.length > 0 ? (
                                                    <img
                                                        src={`${API_BASE_URL_DOC}${item.productDetails.images[0].replace(
                                                            "\\",
                                                            "/"
                                                        )}`}
                                                        alt={item.productDetails?.name}
                                                        className="w-16 h-16 object-cover rounded-md mx-auto"
                                                    />
                                                ) : (
                                                    <span className="text-gray-400">No Image</span>
                                                )}
                                            </td>

                                            {/* Product Name */}
                                            <td className="px-4 py-2 border font-medium">
                                                {item.productDetails?.name}
                                                <br />
                                                <span className="text-xs text-gray-500">
                                                    {item.productDetails?.brand} -{" "}
                                                    {item.productDetails?.model}
                                                </span>
                                            </td>

                                            {/* Category */}
                                            <td className="px-4 py-2 border">
                                                {item.productDetails?.category}
                                            </td>

                                            {/* Quantity */}
                                            <td className="px-4 py-2 border">{item.quantity}</td>

                                            {/* Price */}
                                            <td className="px-4 py-2 border">
                                                ₹{item.price?.toLocaleString() || "0"}
                                                <br />
                                                <span className="text-red-500 text-xs">
                                                    - ₹{item.discount?.toLocaleString() || "0"}
                                                </span>
                                            </td>

                                            {/* Created Date */}
                                            <td className="px-4 py-2 border">
                                                {new Date(
                                                    item.productDetails?.createdAt
                                                ).toLocaleDateString()}
                                            </td>

                                            {/* User Details */}
                                            <td className="px-4 py-2 border text-left">
                                                <p className="font-medium">{item.userDetails?.name}</p>
                                                <p className="text-xs text-gray-600">
                                                    📧 {item.userDetails?.email}
                                                </p>
                                                <p className="text-xs text-gray-600">
                                                    📞 {item.userDetails?.number}
                                                </p>
                                                <p className="text-xs text-gray-600">
                                                    📍 {item.userDetails?.address}
                                                </p>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-500">No items in cart.</p>
                    )}
                </>
            )}
        </div>
    );
};

export default CartItem;
