import React, { useEffect, useState } from "react";
import { api } from "../../config/config";

const Dashboard = () => {
  const [counts, setCounts] = useState({
    TotalUsers: 0,
    TotalOrder: 0,
    TotalProduct: 0,
    TotalCartItems: 0,
  });

  const [loading, setLoading] = useState(true);

  const getDashboardData = async () => {
    try {
      const response = await api.get(`dashboard/dashboard-data`);
      if (response.data.success) {
        setCounts(response.data.counts);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="  p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        📊 Dashboard Overview
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>



      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Users Card */}
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-gray-600">Total Users</h2>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {counts.TotalUsers}
            </p>
          </div>

          {/* Orders Card */}
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-gray-600">Total Orders</h2>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {counts.TotalOrder}
            </p>
          </div>

          {/* Products Card */}
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-gray-600">
              Total Products
            </h2>
            <p className="text-3xl font-bold text-purple-600 mt-2">
              {counts.TotalProduct}
            </p>
          </div>

          {/* Cart Items Card */}
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-gray-600">
              Total Cart Items
            </h2>
            <p className="text-3xl font-bold text-pink-600 mt-2">
              {counts.TotalCartItems}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
