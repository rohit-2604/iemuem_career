import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useHttp } from "../../hooks/useHttp";

function NewPasword({ accessToken }) {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { postReq } = useHttp();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        if (!accessToken) {
            setError("Access token missing. Please verify OTP again.");
            return;
        }
        setLoading(true);
        try {
            const response = await postReq("/api/v1/user/forgetPassword", {
                newPassword: password,
                accessToken
            });
            if (response?.success) {
                navigate("/user/login");
            } else {
                setError(response?.message || "Password reset failed. Please try again.");
            }
        } catch (err) {
            setError("An error occurred during password reset. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='w-full h-full flex flex-col items-center justify-center p-[30px] md:p-[50px] lg:py-[60px] urbanist'>
            <div className="w-full max-w-lg space-y-8">
                <div className="text-center w-full">
                    <h1 className="text-4xl font-bold flex flex-col gap-2">
                        <span className="text-[#367AFF]">IEM Recruit Hub</span>
                        <div>Set a New Password</div>
                    </h1>
                    <p className="mt-2 text-base text-[#969696] inter">
                        Enter a strong password to secure your IEM - UEM Recruit Hub account. Make sure it's different from your previous passwords.
                    </p>
                </div>
                <form className="space-y-4 inter text-gray-600" onSubmit={handleSubmit}>
                    <div className="">
                        <label htmlFor="password" className="block text-xs font-medium mb-1">
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
                    <div className="">
                        <label htmlFor="confirmPassword" className="block text-xs font-medium mb-1">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Confirm your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="h-4 w-4 text-gray-400" />
                                ) : (
                                    <Eye className="h-4 w-4 text-gray-400" />
                                )}
                            </button>
                        </div>
                    </div>
                    {error && <p className="text-red-600 text-sm">{error}</p>}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white text-lg font-medium py-2 px-20 rounded-md transition duration-200 lg:mt-8 md:mt-4 mt-2"
                            disabled={loading}
                        >
                            {loading ? 'Setting...' : 'Set Password'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewPasword