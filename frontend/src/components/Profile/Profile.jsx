import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { api } from '../../config/config';

const Profile = () => {
    const { token } = useSelector((state) => state.auth);
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const getUser = async () => {
        try {
            setIsLoading(true);
            const response = await api.get(`users/user-profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUserData(response.data.data);
        } catch (error) {
            console.error("error", error);
            setError("Failed to fetch user profile");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {   
        getUser();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="w-full mx-auto">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    {/* Header Section */}
                    <div className="bg-[#2e3345] px-6 py-8 sm:px-10 sm:py-10 text-white">
                        <h1 className="text-3xl font-bold mb-2">User Profile</h1>
                        <p className="text-blue-200">Manage your personal information</p>
                    </div>

                    {/* Content Section */}
                    <div className="px-6 py-8 sm:px-10 sm:py-10">
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
                                {error}
                            </div>
                        )}

                        {isLoading ? (
                            <div className="flex justify-center items-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#315bc1]"></div>
                            </div>
                        ) : userData ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
                                    <h2 className="text-lg font-semibold text-[#2e3345] mb-4 pb-2 border-b border-gray-200">Personal Information</h2>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Name</p>
                                            <p className="font-medium text-[#2e3345]">{userData.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Email</p>
                                            <p className="font-medium text-[#2e3345]">{userData.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Phone Number</p>
                                            <p className="font-medium text-[#2e3345]">{userData.number || 'Not provided'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Role</p>
                                            <p className="font-medium text-[#2e3345] capitalize">{userData.role}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
                                    <h2 className="text-lg font-semibold text-[#2e3345] mb-4 pb-2 border-b border-gray-200">Additional Information</h2>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Address</p>
                                            <p className="font-medium text-[#2e3345]">{userData.address || 'Not provided'}</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-white p-3 rounded-lg border border-gray-200 text-center">
                                                <p className="text-sm text-gray-500">Orders</p>
                                                <p className="text-2xl font-bold text-[#315bc1]">{userData.orders?.length || 0}</p>
                                            </div>
                                            <div className="bg-white p-3 rounded-lg border border-gray-200 text-center">
                                                <p className="text-sm text-gray-500">Cart Items</p>
                                                <p className="text-2xl font-bold text-[#315bc1]">{userData.cart?.length || 0}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-500">No user data available</p>
                            </div>
                        )}
                    </div>

                    {/* Footer Section */}
                    <div className="bg-gray-50 px-6 py-4 sm:px-10 border-t border-gray-200">
                        <p className="text-sm text-gray-500 text-center">
                            Last updated: {new Date().toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;