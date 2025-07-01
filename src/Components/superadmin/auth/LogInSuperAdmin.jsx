import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useLogin } from "../../../contexts/SuperAdmin/LoginContext";
import { useHttp } from "../../../hooks/useHttp";

function LogInSuperAdmin({ onLoginSuccess }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [keepLoggedIn, setKeepLoggedIn] = useState(false);
    const [error, setError] = useState(null);

    const { isLogin } = useLogin();
    const { postReq } = useHttp();

    useEffect(() => {
        if (isLogin) {
            // Optionally, you can redirect here if already logged in
        }
    }, [isLogin]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await postReq("/api/v1/superadmin/login", { email, password });
            if (!response?.success) {
                setError(response?.message || "Login failed");
                return;
            }
            if (onLoginSuccess) {
                onLoginSuccess({ email, password, keepLoggedIn });
            }
        } catch (err) {
            setError("Login failed. Please try again.");
        }
    };

    return (
        <div className="w-full max-w-md space-y-8">
            <div className="text-center pb-5">
                <h1 className="text-[45px] font-bold">
                    <span className="text-[#367AFF]">Super Admin</span> Sign in
                </h1>
                <p className="mt-2 text-base text-[#969696] inter">
                    Please enter your credentials to access the dashboard.
                </p>
            </div>

            <form className="space-y-4 inter" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your email"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-xs font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                                <Eye className="h-4 w-4 text-gray-400" />
                            )}
                        </button>
                    </div>
                </div>

                <div className="flex items-center py-2">
                    {/* <input
                        id="keep-logged-in"
                        type="checkbox"
                        checked={keepLoggedIn}
                        onChange={(e) => setKeepLoggedIn(e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    /> */}
                    {/* <label htmlFor="keep-logged-in" className="ml-2 block text-base text-[#232323] inter">
                        Keep me logged in
                    </label> */}
                </div>

                {error && <p className="text-red-600 text-sm">{error}</p>}

                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white text-xl font-medium py-2 px-4 rounded-md transition duration-200"
                >
                    Sign in
                </button>
            </form>
        </div>
    )
}

export default LogInSuperAdmin;