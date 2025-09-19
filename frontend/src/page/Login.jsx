import React, { useState } from "react";
import { api, API_BASE_URL } from "../config/config";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../state/authSlice.js";
import { useDispatch } from "react-redux";


const Login = () => {
    const [number, setNumber] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();



    const handleRegisterPage = () => {
        navigate("/register");
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);
        try {
            const response = await api.post(`${API_BASE_URL}users/login`, {
                number,
                password,
            });
            const { success, token, user, message } = response.data;

            if (success) {
                setSuccess(message || "Login successful!");
                dispatch(loginSuccess({ token, user }));
                setTimeout(() => navigate("/dashboard"), 100);
            } else {
                setError(message || "Login failed");
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
                    Welcome Back EasyShop!
                </h2>
                <p className="mb-8 text-center text-gray-500">
                    Please login to your account
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
                <form className="space-y-6" onSubmit={handleLogin}>
                    {/* Number Input */}
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

                    {/* Password Input */}
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

                    {/* Remember & Forgot Password */}
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 text-gray-600">
                            <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            Remember me
                        </label>
                        <a href="#" className="text-blue-600 hover:underline">
                            Forgot password?
                        </a>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-blue-800 px-4 py-3 font-semibold text-white transition duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed disabled:bg-blue-400"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                {/* Divider */}
                <div className="my-6 flex items-center">
                    <hr className="flex-grow border-gray-300" />
                    <span className="mx-2 text-gray-400">or</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                <p className="mt-6 text-center text-gray-600">
                    Don’t have an account?{" "}
                    <button onClick={handleRegisterPage} className="font-semibold text-blue-600 hover:underline">
                        Sign up
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;
