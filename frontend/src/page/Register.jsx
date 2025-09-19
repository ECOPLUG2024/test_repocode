import React, { useState } from "react";
import { api, API_BASE_URL } from "../config/config";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleLoginPage = () => {
        navigate("/login");
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const response = await api.post(`${API_BASE_URL}users/register`, {
                name,
                number,
                email,
                address,
                password,
                role,
            });

            if (response.data.success) {
                setSuccess("Registration successful! Please login.");
                setTimeout(() => navigate("/"), 1500);
            } else {
                setError(response.data.message || "Registration failed");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
                {/* Heading */}
                <h2 className="mb-6 text-center text-3xl font-bold text-blue-800">
                    Create Your EasyShop Account
                </h2>
                <p className="mb-8 text-center text-gray-500">
                    Fill in the details to register
                </p>

                {/* Error / Success */}
                {error && (
                    <p className="mb-4 rounded-lg bg-red-100 px-4 py-2 text-sm text-red-600">
                        {error}
                    </p>
                )}
                {success && (
                    <p className="mb-4 rounded-lg bg-green-100 px-4 py-2 text-sm text-green-600">
                        {success}
                    </p>
                )}

                {/* Form */}
                <form className="space-y-6" onSubmit={handleRegister}>
                    {/* Name */}
                    <div>
                        <label
                            htmlFor="name"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            required
                        />
                    </div>

                    {/* Number */}
                    <div>
                        <label
                            htmlFor="number"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Mobile Number
                        </label>
                        <input
                            type="text"
                            id="number"
                            placeholder="Enter your mobile number"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            required
                        />
                    </div>

                    {/* Address */}
                    <div>
                        <label
                            htmlFor="address"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Address
                        </label>
                        <input
                            type="text"
                            id="address"
                            placeholder="Enter your address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            required
                        />
                    </div>

                    {/* Register Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-blue-800 px-4 py-3 font-semibold text-white transition duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed disabled:bg-blue-400"
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>

                {/* Divider */}
                <div className="my-6 flex items-center">
                    <hr className="flex-grow border-gray-300" />
                    <span className="mx-2 text-gray-400">or</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                <p className="mt-6 text-center text-gray-600">
                    Already have an account?{" "}
                    <button
                        onClick={handleLoginPage}
                        className="font-semibold text-blue-600 hover:underline"
                    >
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Register;
