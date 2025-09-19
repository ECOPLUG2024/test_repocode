import React, { useEffect, useState } from "react";
import { api, API_BASE_URL_DOC } from "../../config/config";
import { useParams } from "react-router-dom";

const ViewProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  

  const getProductDetailsById = async () => {
    try {
      const response = await api.get(`product/product-details/${id}`);
      setProduct(response.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };


  useEffect(() => {
    getProductDetailsById();
  }, [id]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <h1 className="text-xl font-semibold text-gray-600 animate-pulse">
          Loading Product Details...
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Product Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
        <p className="text-gray-600 mt-2">{product.description}</p>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Side - Images */}
        <div className="flex flex-col gap-4">
          {product.images?.length > 0 ? (
            product.images.map((img, index) => (
              <img
                key={index}
                src={`${API_BASE_URL_DOC}${img.replace(/\\/g, "/")}`}
                alt={product.name}
                className="w-full h-72 object-contain rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
              />
            ))
          ) : (
            <div className="w-full h-72 flex items-center justify-center bg-gray-100 rounded-2xl shadow-md">
              <p className="text-gray-400">No Image Available</p>
            </div>
          )}
        </div>

        {/* Right Side - Details */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          {/* Price Section */}
          <p className="text-2xl font-bold text-green-600">
            ₹{product.price.toLocaleString()}
            {product.discount > 0 && (
              <span className="text-lg text-red-500 ml-2">
                (Save ₹{product.discount.toLocaleString()})
              </span>
            )}
          </p>

          {/* Product Specs */}
          <div className="grid grid-cols-2 gap-6 text-gray-700">
            <p>
              <span className="font-semibold">Brand:</span> {product.brand}
            </p>
            <p>
              <span className="font-semibold">Model:</span> {product.model}
            </p>
            <p>
              <span className="font-semibold">Category:</span>{" "}
              {product.category}
            </p>
            <p>
              <span className="font-semibold">Year:</span> {product.year}
            </p>
            <p>
              <span className="font-semibold">Fuel Type:</span>{" "}
              {product.fuel_type}
            </p>
            <p>
              <span className="font-semibold">Mileage:</span>{" "}
              {product.mileage}
            </p>
          </div>

          {/* Key Points */}
          <div>
            <h2 className="font-semibold mb-2 text-gray-800">Key Points:</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {product.key_points?.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>

          {/* Posted Date */}
          <p className="text-sm text-gray-500">
            Posted on: {new Date(product.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewProductDetails;
