import React, { useEffect, useState } from "react";
import { api } from "../../config/config";
import { useNavigate } from "react-router-dom";

const Order = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    const getOrders = async () => {
        try {
            const response = await api.get(`order/get-order`);
            setOrders(response.data.data || []);
        } catch (error) {
            console.log("error", error);
        }
    };
    useEffect(() => {
        getOrders();
    }, []);

    const handleOrderDetails = (order) => {
        navigate(`/order-details/${order._id}`, { state: { order } });
    };

    // Utility function
    const formatText = (text) => {
        if (!text) return "";
        return text
            .split("_") // break into words by underscore
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // capitalize first letter
            .join(" "); // join back with space
    };


    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Order List</h1>
            <table className="table-auto border-collapse border border-gray-300 w-full text-left">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">#</th>
                        <th className="border border-gray-300 px-4 py-2">User</th>
                        <th className="border border-gray-300 px-4 py-2">Item</th>
                        <th className="border border-gray-300 px-4 py-2">Price</th>
                        <th className="border border-gray-300 px-4 py-2">Status</th>
                        <th className="border border-gray-300 px-4 py-2">Created At</th>
                        <th className="border border-gray-300 px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 ? (
                        orders.map((order, index) => (
                            <tr key={order._id}>
                                <td className="border border-gray-300 px-4 py-2">
                                    {index + 1}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {order.user?.name} <br /> {order.user?.email}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {order.item?.name} ({order.item?.brand})
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    ₹{order.item?.price}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {formatText(order.status)}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {new Date(order.createdAt).toLocaleString()}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button onClick={() => handleOrderDetails(order)} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2">
                                        View
                                    </button>
                                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan="8"
                                className="text-center border border-gray-300 px-4 py-2"
                            >
                                No orders found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Order;
