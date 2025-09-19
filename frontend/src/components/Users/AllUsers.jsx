import React, { useEffect, useState } from "react";
import { api } from "../../config/config";

const AllUsers = () => {
    const [users, setUsers] = useState([]);

    const getAllUsers = async () => {
        try {
            const response = await api.get(`users/allusers`);
            console.log("response is ; ", response.data.data);
            setUsers(response.data.data);
        } catch (error) {
            console.log("error", error);
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">All Users</h1>

            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="min-w-full border border-gray-200">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold border">
                                S.No.
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold border">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold border">
                                Number & Address
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold border">
                                Role
                            </th>

                            <th className="px-6 py-3 text-center text-sm font-semibold border">
                                Orders
                            </th>
                            <th className="px-6 py-3 text-center text-sm font-semibold border">
                                Cart
                            </th>
                            <th className="px-6 py-3 text-center text-sm font-semibold border">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600">
                        {users.map((user, index) => (
                            <tr
                                key={user._id}
                                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                    } hover:bg-gray-100`}
                            >
                                <td className="px-6 py-3 border"> {index + 1}</td>
                                <td className="px-6 py-3 border">{user.name} <br /> {user.email} </td>
                                <td className="px-6 py-3 border">{user.number} <br />{user.address} </td>
                                <td className="px-6 py-3 border capitalize">{user.role}</td>
                                <td className="px-6 py-3 border text-center">
                                    {user.orders?.length || 0}
                                </td>
                                <td className="px-6 py-3 border text-center">
                                    {user.cart?.length || 0}
                                </td>
                                <td className="px-6 py-3 border text-center">
                                    <button className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-blue-600">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;
