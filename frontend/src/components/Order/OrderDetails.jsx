import React from "react";
import { useLocation, useParams } from "react-router-dom";

const formatText = (text) => {
  if (!text) return "";
  return text
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const StatusBadge = ({ status }) => {
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
    approved: "bg-green-100 text-green-700 border-green-300",
    rejected: "bg-red-100 text-red-700 border-red-300",
    shipped: "bg-blue-100 text-blue-700 border-blue-300",
    delivered: "bg-green-200 text-green-800 border-green-400",
  };

  return (
    <span
      className={`px-3 py-1 text-sm font-medium rounded-full border ${statusColors[
        status?.toLowerCase()
      ] || "bg-gray-100 text-gray-700 border-gray-300"}`}
    >
      {formatText(status)}
    </span>
  );
};

const OrderDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-xl font-semibold text-gray-600">
          🚫 No order data found for ID: {id}
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Order Details</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-6">
          {/* User Info */}
          <div className="bg-white p-5 rounded-2xl shadow hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
              👤 User Information
            </h2>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <strong className="text-gray-800">Name:</strong>{" "}
                {order.user?.name}
              </p>
              <p>
                <strong className="text-gray-800">Email:</strong>{" "}
                {order.user?.email}
              </p>
              <p>
                <strong className="text-gray-800">Number:</strong>{" "}
                {order.user?.number}
              </p>
              <p>
                <strong className="text-gray-800">Address:</strong>{" "}
                {order.user?.address}
              </p>
              <p>
                <strong className="text-gray-800">Role:</strong>{" "}
                {order.user?.role}
              </p>
            </div>
          </div>

          {/* Order Info */}
          <div className="bg-white p-5 rounded-2xl shadow hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
              📦 Order Information
            </h2>
            <div className="space-y-3 text-sm text-gray-600">
              <p>
                <strong className="text-gray-800">Status:</strong>{" "}
                <StatusBadge status={order.status} />
              </p>
              <p>
                <strong className="text-gray-800">Order Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>
              <p>
                <strong className="text-gray-800">Last Updated:</strong>{" "}
                {new Date(order.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
              🛒 Item Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <p>
                <strong className="text-gray-800">Name:</strong>{" "}
                {order.item?.name}
              </p>
              <p>
                <strong className="text-gray-800">Brand:</strong>{" "}
                {order.item?.brand}
              </p>
              <p>
                <strong className="text-gray-800">Model:</strong>{" "}
                {order.item?.model}
              </p>
              <p>
                <strong className="text-gray-800">Category:</strong>{" "}
                {order.item?.category}
              </p>
              <p>
                <strong className="text-gray-800">Year:</strong>{" "}
                {order.item?.year}
              </p>
              <p>
                <strong className="text-gray-800">Mileage:</strong>{" "}
                {order.item?.mileage}
              </p>
              <p>
                <strong className="text-gray-800">Fuel Type:</strong>{" "}
                {order.item?.fuel_type}
              </p>
              <p>
                <strong className="text-gray-800">Price:</strong> ₹
                {order.item?.price}
              </p>
              <p>
                <strong className="text-gray-800">Discount:</strong> ₹
                {order.item?.discount}
              </p>
            </div>

            <p className="mt-4 text-sm text-gray-600">
              <strong className="text-gray-800">Description:</strong>{" "}
              {order.item?.description}
            </p>

            {/* Key Points */}
            {order.item?.key_points?.length > 0 && (
              <div className="mt-4">
                <strong className="text-gray-800">Key Points:</strong>
                <ul className="list-disc list-inside text-sm text-gray-600 mt-1 space-y-1">
                  {order.item.key_points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Images */}
            {order.item?.images?.length > 0 && (
              <div className="mt-6">
                <strong className="text-gray-800">Images:</strong>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2">
                  {order.item.images.map((img, i) => (
                    <div
                      key={i}
                      className="overflow-hidden rounded-lg shadow hover:shadow-lg transition"
                    >
                      <img
                        src={`http://localhost:8000/${img.replace("\\", "/")}`}
                        alt={`Item ${i}`}
                        className="w-full h-32 object-cover transform hover:scale-105 transition duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
